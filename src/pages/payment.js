import React, { useState, useEffect } from "react";
import "./PaymentPage.css";

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [showForm, setShowForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    amount: "",
    transaction_id: "",
    date: "",
  });

  // Generate floating particles
  const generateParticles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}
        />
      );
    }
    return particles;
  };

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI Payment",
      icon: "📱",
      logos: [
        { name: "GPay", class: "gpay", text: "G" },
        { name: "PhonePe", class: "phonepe", text: "P" },
        { name: "Paytm", class: "paytm", text: "₹" },
        { name: "BHIM", class: "bhim", text: "B" },
      ],
    },
    {
      id: "cards",
      name: "Credit/Debit Cards",
      icon: "💳",
      logos: [
        { name: "Visa", class: "visa", text: "V" },
        { name: "Mastercard", class: "mastercard", text: "M" },
        { name: "Amex", class: "amex", text: "A" },
        { name: "RuPay", class: "rupay", text: "R" },
      ],
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: "🏦",
      logos: [
        { name: "ICICI", class: "icici", text: "I" },
        { name: "HDFC", class: "hdfc", text: "H" },
        { name: "SBI", class: "sbi", text: "S" },
        { name: "Axis", class: "axis", text: "A" },
      ],
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: "💰",
      logos: [
        { name: "Mobikwik", class: "mobikwik", text: "M" },
        { name: "Freecharge", class: "freecharge", text: "F" },
        { name: "Amazon Pay", class: "amazonpay", text: "A" },
        { name: "Ola Money", class: "ola", text: "O" },
      ],
    },
  ];

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Add some visual feedback for copy action
      console.log("Copied:", text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentSubmit = () => {
    if (selectedMethod === "upi" || selectedMethod === "netbanking") {
      setShowForm(true);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const { fullName, email, phoneNumber, amount, transaction_id, date } =
      formData;

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !amount ||
      !transaction_id ||
      !date
    ) {
      alert("⚠ Please fill in all required fields to continue");
      setIsProcessing(false);
      return;
    }

    const payment_data = {
      fullName,
      email,
      phoneNumber,
      amount,
      transaction_id,
      date,
      paymentMethod: selectedMethod,
    };

    try {
      const response = await fetch(
        "https://qlw95zx5ta.execute-api.eu-north-1.amazonaws.com/t/user/paymentprocess/payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payment_data),
        }
      );

      if (!response.ok) {
        throw new Error(`Payment processing error (${response.status})`);
      }

      const result = await response.json();

      setTimeout(() => {
        setIsProcessing(false);
        setShowModal(true);
      }, 2000);
    } catch (error) {
      console.error("Payment processing error:", error);
      setIsProcessing(false);
      alert(
        "❌ Payment processing failed. Please try again or contact support."
      );
    }
  };

  const renderPaymentDetails = () => {
    if (selectedMethod === "upi") {
      return (
        <div className="payment-details">
          <div className="qr-section">
            <div className="section-header">
              <h3 className="qr-title">UPI QR Code</h3>
              <button className="refresh-qr">↻ Refresh</button>
            </div>

            <div className="qr-container">
              <div className="qr-code">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?data=upi://pay?pa=braincraft@upi&pn=BrainCraft%20AI%20(OPC)%20Private%20Limited&mc=0&tid=1234567890&am=BrainCraft%20AI%20(OPC)%20Private%20Limited&tid=1234567890&cu=INR&url=https://braincraftai.com"
                  alt="UPI QR Code"
                  className="qr-image"
                />  
              </div>
            </div>

            <p className="qr-instruction">Scan with any UPI app to pay</p>

            <div className="upi-apps">
              <div className="upi-app phonepe">P</div>
              <div className="upi-app bhim">B</div>
              <div className="upi-app gpay">G</div>
              <div className="upi-app paytm">₹</div>
              <div className="upi-app">📱</div>
            </div>
          </div>

          <div className="recommended-section">
            <div className="recommended-header">Recommended Option</div>
            <div className="recommended-option" onClick={handlePaymentSubmit}>
              <div className="option-left">
                <div className="option-icon">P</div>
                <span className="option-name">PhonePe Payment</span>
              </div>
              <span className="option-chevron">→</span>
            </div>
          </div>

          {showForm && (
            <form className="payment-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="+91-XXXX-XXXXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Transaction ID</label>
                <input
                  type="text"
                  name="transaction_id"
                  value={formData.transaction_id}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter transaction reference ID"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Transaction Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="spinner"></div>
                    Processing Payment...
                  </>
                ) : (
                  "Complete Payment"
                )}
              </button>
            </form>
          )}
        </div>
      );
    }

    if (selectedMethod === "netbanking") {
      return (
        <div className="payment-details">
          <div className="bank-details">
            <h3 className="bank-details-header">Bank Transfer Details</h3>

            <div className="bank-info">
              <div className="bank-detail">
                <span className="detail-label">Account Name</span>
                <div className="detail-value">
                  BRAINCRAFT AI (OPC) PRIVATE LIMITED
                  <button
                    className="copy-btn"
                    onClick={() =>
                      copyToClipboard("BRAINCRAFT AI (OPC) PRIVATE LIMITED")
                    }
                  >
                    📋
                  </button>
                </div>
              </div>

              <div className="bank-detail">
                <span className="detail-label">Account Number</span>
                <div className="detail-value">
                  10226606034
                  <button
                    className="copy-btn"
                    onClick={() => copyToClipboard("10226606034")}
                  >
                    📋
                  </button>
                </div>
              </div>

              <div className="bank-detail">
                <span className="detail-label">IFSC Code</span>
                <div className="detail-value">
                  IDFB0080231
                  <button
                    className="copy-btn"
                    onClick={() => copyToClipboard("IDFB0080231")}
                  >
                    📋
                  </button>
                </div>
              </div>

              <div className="bank-detail">
                <span className="detail-label">Bank Name</span>
                <div className="detail-value">
                  IDFC FIRST BANK
                  <button
                    className="copy-btn"
                    onClick={() => copyToClipboard("IDFC FIRST BANK")}
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>

            <div className="bank-note">
              <strong>💡 Important:</strong> After completing the bank transfer, 
              please allow 24 hours for verification before your course access 
              is activated. Keep your transaction receipt for reference.
            </div>

            <button className="submit-btn" onClick={handlePaymentSubmit}>
              I Have Completed Transfer
            </button>

            {showForm && (
              <form className="payment-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+91-XXXX-XXXXXX"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter transfer amount"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Transaction Reference</label>
                  <input
                    type="text"
                    name="transaction_id"
                    value={formData.transaction_id}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Bank transaction reference number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Transfer Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      Verifying Transfer...
                    </>
                  ) : (
                    "Submit Transfer Details"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="payment-details">
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#4a5568",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <h3 style={{ marginBottom: "1rem", fontSize: "1.4rem", color: "#2d3748" }}>
            📋 Payment Method Selection
          </h3>
          <p style={{ color: "#68d391", fontSize: "1rem" }}>
            Please select a payment method from the menu to continue
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        {/* Floating Particles */}
        <div className="particles">{generateParticles()}</div>

        {/* Left Panel */}
        <div className="left-panel">
          <div className="brand-section">
            <div className="brand-logo">🧠</div>
            <div className="brand-name">Crafting Brain</div>
          </div>

          <div className="price-summary">
            <h3>Course Fee</h3>
            <div className="price-amount">₹4,500</div>

            <div className="user-info">
              <div className="user-avatar">👤</div>
              <div className="user-details">Contact: +91 93050 09726</div>
              <div className="chevron">→</div>
            </div>
          </div>

          <div className="illustration">
            <div className="illustration-image">
              <img
                src="https://scitechdaily.com/images/Left-Right-Brain-Signals.gif"
                alt="Educational Animation"
                style={{ width: "100%", height: "auto" }}
              />
            </div>

            <div className="security-text">
              Secure & Encrypted Payment
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="payment-header">
            <h2 className="payment-title">Secure Payment Gateway</h2>
            <button className="close-btn">−</button>
            <button className="close-btn">×</button>
          </div>

          <div className="payment-content">
            {/* Payment Methods List */}
            <div className="payment-methods-list">
              <div className="method-section">
                <div className="section-label">Recommended</div>

                {paymentMethods.slice(0, 2).map((method) => (
                  <button
                    key={method.id}
                    className={`payment-method ${
                      selectedMethod === method.id ? "active" : ""
                    }`}
                    onClick={() => handleMethodSelect(method.id)}
                  >
                    <div className="method-icon">{method.icon}</div>
                    <div>
                      <div className="method-name">{method.name}</div>
                      <div className="method-logos">
                        {method.logos.map((logo) => (
                          <div
                            key={logo.name}
                            className={`method-logo ${logo.class}`}
                          >
                            {logo.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="method-section">
                <div className="section-label">Other Options</div>
                {paymentMethods.slice(2).map((method) => (
                  <button
                    key={method.id}
                    className={`payment-method ${
                      selectedMethod === method.id ? "active" : ""
                    }`}
                    onClick={() => handleMethodSelect(method.id)}
                  >
                    <div className="method-icon">{method.icon}</div>
                    <div>
                      <div className="method-name">{method.name}</div>
                      <div className="method-logos">
                        {method.logos.map((logo) => (
                          <div
                            key={logo.name}
                            className={`method-logo ${logo.class}`}
                          >
                            {logo.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Details Panel */}
            {renderPaymentDetails()}
          </div>
        </div>

        {/* Success Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="success-icon">✓</div>
              <h2 className="modal-title">Payment Successful!</h2>
              <p className="modal-message">
                Your payment has been successfully processed. You will receive 
                a confirmation email shortly with your course access details. 
                Thank you for choosing Crafting Brain!
              </p>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                Continue to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;