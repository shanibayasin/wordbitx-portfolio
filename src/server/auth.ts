import crypto from 'crypto';
import type { Request, Response, NextFunction } from 'express';
import { db } from './db.js';
import type { User, Organization, UserRole } from '../types/crm.js';

const JWT_SECRET = process.env.JWT_SECRET || 'wordbitx_super_secure_secret_production_key_2026';

export interface AuthenticatedUser extends User {
  tokenOrgId?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
  organization?: Organization;
}

export function createToken(payload: { userId: string; role: UserRole; organizationId?: string }): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
  const body = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): { userId: string; role: UserRole; organizationId?: string; exp: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. No Bearer token provided.' });
  }

  const token = authHeader.substring(7).trim();
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired session token.' });
  }

  const user = db.findUserById(decoded.userId);
  if (!user || user.status === 'SUSPENDED') {
    return res.status(401).json({ error: 'User account not found or suspended.' });
  }

  req.user = {
    ...user,
    tokenOrgId: decoded.organizationId,
  };

  const effectiveOrgId = decoded.organizationId || user.organizationId;
  if (effectiveOrgId) {
    const org = db.findOrgById(effectiveOrgId);
    if (org) {
      req.organization = org;
    }
  }

  next();
}

export function requireSuperAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'SUPER_ADMIN') {
    db.logAudit({
      userId: req.user?.id || 'anonymous',
      userName: req.user?.name || 'Unknown',
      organizationId: req.user?.organizationId,
      action: 'UNAUTHORIZED_ACCESS_ATTEMPT',
      resource: 'SuperAdminPanel',
      details: `User ${req.user?.email || 'unknown'} attempted to access Super Admin endpoint`,
      ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress,
    });
    return res.status(403).json({ error: 'Forbidden: Super Admin privileges required.' });
  }
  next();
}

export function requireTenant(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  const orgId = req.organization?.id || req.user.organizationId;
  if (!orgId) {
    return res.status(403).json({ error: 'No organization assigned. Please complete onboarding.' });
  }
  if (req.organization && req.organization.status === 'SUSPENDED') {
    return res.status(403).json({ error: 'Organization has been suspended. Please contact WordbitX support.' });
  }
  next();
}

export function requireRole(allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    if (req.user.role === 'SUPER_ADMIN') {
      return next();
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: `Forbidden: Action requires one of [${allowedRoles.join(', ')}]` });
    }
    next();
  };
}
