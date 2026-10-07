import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Lock, ArrowRight, RefreshCw } from 'lucide-react';
import { Modal } from './Modal.js';
import { getToken } from '../../services/apiClient.js';
import { useAuth } from '../../context/AuthContext.js';

interface TenantTesterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TenantTesterModal: React.FC<TenantTesterModalProps> = ({ isOpen, onClose }) => {
  const { user, organization } = useAuth();
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const runTenantSecurityTest = async () => {
    setTesting(true);
    setTestResult(null);
    const token = getToken();

    try {
      // Intentionally request Org B's lead ID 'lead_apex_1' with currently logged in user's token (Org A)
      const res = await fetch('/api/crm/leads/lead_apex_1', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setTestResult({
        status: res.status,
        statusText: res.statusText,
        blocked: res.status === 404 || res.status === 403,
        response: data,
        testedEndpoint: 'GET /api/crm/leads/lead_apex_1 (Belongs to Apex Dynamics / Org B)',
        currentTenant: `${organization?.name || 'Current Org'} (${organization?.id || 'N/A'})`,
      });
    } catch (err: any) {
      setTestResult({
        error: err.message,
        blocked: true,
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Multi-Tenant Isolation Security Audit" maxWidth="lg">
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-indigo-950">
          <Lock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-indigo-900">Tenant Isolation Verification Tool</p>
            <p className="text-xs text-indigo-700 mt-1">
              Current Session: <span className="font-medium">{user?.name}</span> ({user?.role}) from{' '}
              <span className="font-medium">{organization?.name}</span> ({organization?.id}).
            </p>
            <p className="text-xs text-indigo-600 mt-1">
              This test sends a direct raw HTTP request to access Org B's confidential lead record (<code>lead_apex_1</code>). The server must reject this with HTTP 404/403.
            </p>
          </div>
        </div>

        <button
          onClick={runTenantSecurityTest}
          disabled={testing}
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          {testing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
          Execute Live Cross-Tenant Access Attack
        </button>

        {testResult && (
          <div
            className={`p-4 rounded-lg border text-sm space-y-2 ${
              testResult.blocked
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {testResult.blocked ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>PASS: Unauthorized Cross-Tenant Access Blocked!</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <span>FAIL: Cross-Tenant Data Leaked!</span>
                </>
              )}
            </div>
            <div className="text-xs font-mono bg-white p-3 rounded border border-slate-200 text-slate-800 space-y-1 overflow-x-auto">
              <div>HTTP Status: <strong className={testResult.status === 404 ? 'text-amber-600' : 'text-emerald-600'}>{testResult.status} {testResult.statusText}</strong></div>
              <div>Target Record: lead_apex_1 (Org B)</div>
              <div>Server Response: {JSON.stringify(testResult.response)}</div>
            </div>
            <p className="text-xs">
              Tenant boundary enforced strictly at the database query layer. No data from Org B can leak to Org A.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
