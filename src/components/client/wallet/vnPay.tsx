import React, { useState, useEffect } from 'react';

const VNPayCheckout: React.FC = () => {
  const [amount, setAmount] = useState(100000); // Số tiền cần thanh toán
  const [response, setResponse] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vnp_ResponseCode = params.get('vnp_ResponseCode');
    const vnp_TransactionNo = params.get('vnp_TransactionNo');
    if (vnp_ResponseCode && vnp_TransactionNo) {
      // Xử lý kết quả thanh toán ở đây
      setResponse(`Mã kết quả: ${vnp_ResponseCode}, Số giao dịch: ${vnp_TransactionNo}`);
    }
  }, []);

  const handleSubmit = async () => {
    const redirectUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // URL của VNPay
    const data = {
      vnp_Amount: amount * 100,
      vnp_Command: 'pay',
      vnp_CreateDate: new Date().toISOString().replace(/-/g, ''),
      vnp_CurrCode: 'VND',
      vnp_IpAddr: '127.0.0.1', // IP của người dùng
      vnp_Locale: 'vn',
      vnp_OrderInfo: 'Thanh toan don hang',
      vnp_OrderType: 'billpayment',
      vnp_ReturnUrl: 'http://localhost:3000/return', // URL để nhận kết quả thanh toán từ VNPay
      vnp_TmnCode: 'B4RX55G4', // Mã merchant của bạn
      vnp_TxnRef: 'order123456', // Tham chiếu đơn hàng
    };

    const queryString = Object.keys(data)
      .map((key) => `${key}=${encodeURIComponent(data[key])}`)
      .join('&');

    window.location.href = `${redirectUrl}?${queryString}`;
  };

  return (
    <div>
      <h2>Thanh toán VNPay</h2>
      <button onClick={handleSubmit}>Thanh toán</button>
      <div>{response}</div>
    </div>
  );
};

export default VNPayCheckout;
