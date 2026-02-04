
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kitpcbcboqlgrbrrkijl.supabase.co';
/** 
 * Public API Key for browser-side protocol operations.
 * Authorized for anonymous and authenticated traffic under RLS governance.
 */
const supabaseKey = 'sb_publishable_rGJFn7hpPjKd9PGe7ao5HQ_ow7F-RUa';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Utility to check connection health using the Auth protocol
// This is more reliable than table-based checks as it only requires Auth to be enabled
export const checkSupabaseConnection = async () => {
  try {
    // We try to get a session. This pings the GoTrue server directly.
    const { error } = await supabase.auth.getSession();
    if (error) {
      console.warn('Auth handshake responded with error:', error.message);
      // We don't throw here because even a 401/400 from the auth server means it's "online"
      // If the error is 'Invalid API key', the infrastructure is reachable but unauthorized.
    }
    return true;
  } catch (err) {
    console.error('Supabase infrastructure unreachable:', err);
    return false;
  }
};
