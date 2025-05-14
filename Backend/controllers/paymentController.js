// import paypal from "paypal-rest-sdk";
// import dotenv from "dotenv";

// dotenv.config();

// // 🔹 Configure PayPal SDK
// paypal.configure({
//   mode: process.env.PAYPAL_MODE, // sandbox or live
//   client_id: process.env.PAYPAL_CLIENT_ID,
//   client_secret: process.env.PAYPAL_SECRET,
// });

// // 🔹 Create PayPal Payment
// export const createPayment = (req, res) => {
//   const { amount, currency } = req.body;

//   const paymentJson = {
//     intent: "sale",
//     payer: { payment_method: "paypal" },
//     redirect_urls: {
//       return_url: "http://localhost:7000/api/payments/success",
//       cancel_url: "http://localhost:7000/api/payments/cancel",
//     },
//     transactions: [
//       {
//         amount: { total: amount, currency },
//         description: "Healthcare Service Payment",
//       },
//     ],
//   };

//   paypal.payment.create(paymentJson, (error, payment) => {
//     if (error) {
//       res.status(500).json({ message: "Payment failed", error });
//     } else {
//       const approvalUrl = payment.links.find((link) => link.rel === "approval_url").href;
//       res.json({ approvalUrl });
//     }
//   });
// };

// // 🔹 Handle Payment Success
// export const successPayment = (req, res) => {
//   const { paymentId, PayerID } = req.query;

//   paypal.payment.execute(paymentId, { payer_id: PayerID }, (error, payment) => {
//     if (error) {
//       res.status(500).json({ message: "Payment Execution Failed", error });
//     } else {
//       res.json({ message: "Payment Successful", payment });
//     }
//   });
// };

// // 🔹 Handle Payment Cancellation
// export const cancelPayment = (req, res) => {
//   res.json({ message: "Payment Cancelled" });
// };
