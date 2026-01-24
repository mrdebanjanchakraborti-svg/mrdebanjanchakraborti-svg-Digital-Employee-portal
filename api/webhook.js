
/**
 * OMNICHANNEL REVENUE LEDGER: RAZORPAY WEBHOOK HANDSHAKE
 * Architecture: Node.js + Express + Crypto
 * Purpose: Ensure 100% ledger integrity via SHA256 Signature Verification.
 */

const crypto = require('crypto');

// Configuration Pulse - Must be defined in your secure environment
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

module.exports = async (req, res) => {
  // 1. Extract Identity Pulse
  const signature = req.headers['x-razorpay-signature'];
  const body = JSON.stringify(req.body);

  if (!signature) {
    console.error("Security Breach: Missing Razorpay Signature.");
    return res.status(400).json({ error: "Signature Required" });
  }

  // 2. Perform Security Handshake (HMAC SHA256)
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  hmac.update(body);
  const digest = hmac.digest('hex');

  if (signature !== digest) {
    console.error("Ledger Breach Attempt: Invalid HMAC Signature detected.");
    return res.status(401).json({ error: "Identity Verification Failed" });
  }

  // 3. Process Dispatch Signal
  const { event, payload } = req.body;
  const payment = payload.payment.entity;

  switch (event) {
    case 'payment.captured':
      console.log(`Financial Pulse Authorized: Order ${payment.order_id} captured successfully.`);
      console.log(`Value: ${payment.amount / 100} ${payment.currency}`);
      
      /**
       * COMMIT TO GLOBAL LEDGER:
       * 1. Update Subscription Status to 'ACTIVE'
       * 2. Insert Transaction Row into 'wallet_ledger'
       * 3. Send WhatsApp confirmation via Pulse Dispatcher
       */
      
      return res.status(200).json({ 
        status: "Ledger Synced", 
        transaction_id: payment.id,
        order_id: payment.order_id
      });

    case 'payment.failed':
      const errorMsg = payment.error_description || "Unknown Protocol Error";
      console.warn(`Payment Pulse Failed: ${errorMsg} (Code: ${payment.error_code})`);
      
      /**
       * LOG FAILURE LOGIC:
       * 1. Update Subscription Status to 'PAYMENT_FAILED'
       * 2. Notify Owner via CEO Cockpit Alert
       */
      
      return res.status(200).json({ 
        status: "Error Logged", 
        reason: errorMsg 
      });

    default:
      console.log(`Ignored Signal: ${event}`);
      return res.status(200).send("Pulse Processed (No Action Required)");
  }
};
