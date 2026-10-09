import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cartcontext'; 
import { CustomerForm } from './CustomerForm';
import { ShippingForm } from './ShippingForm';
import { PaymentForm } from './PaymentForm';
import styles from './Form.module.css';

export default function CheckoutFlow() {
  const navigate = useNavigate();
  
  const { clearCart } = useCart(); 
  
  const [activeStep, setActiveStep] = useState<number>(1);
  const [checkoutData, setCheckoutData] = useState<any>({
    customer: null,
    shipping: null,
    payment: null,
  });

  const handleCustomerSubmit = (data: any) => {
    setCheckoutData((prev: any) => ({ ...prev, customer: data }));
    setActiveStep(2);
  };

  const handleShippingSubmit = (data: any) => {
    setCheckoutData((prev: any) => ({ ...prev, shipping: data }));
    setActiveStep(3);
  };

  const handlePaymentSubmit = (data: any) => {
    setCheckoutData((prev: any) => ({ ...prev, payment: data }));
    setActiveStep(4); 
  };

  const isAllStepsCompleted = 
    checkoutData.customer !== null && 
    checkoutData.shipping !== null && 
    checkoutData.payment !== null;

  const handleFinalPayment = async () => {
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...checkoutData,
          date: new Date().toLocaleDateString(),
        }),
      });

      if (!response.ok) throw new Error("Kunde inte spara ordern");

      const savedOrder = await response.json();
      
      clearCart(); 
      
      navigate(`/orderconfirmation/${savedOrder.id}`);
      
    } catch (error) {
      console.error("Det gick inte att slutföra köpet:", error);
      alert("Något gick fel när ordern skulle skapas.");
    }
  };

  return (
    <div className={styles.checkoutWrapper}>
      
      <div className={`${styles.step} ${activeStep >= 1 ? styles.active : styles.disabled}`}>
        {activeStep === 1 ? (
          <>
            <h3>1. Kundinformation</h3>
            <CustomerForm onSubmitSuccess={handleCustomerSubmit} />
          </>
        ) : (
          checkoutData.customer && (
            <div className={styles.savedSummary}>
              <h3>1. Kundinformation ✓</h3>
              <p>{checkoutData.customer.firstname} {checkoutData.customer.lastname}</p>
            </div>
          )
        )}
      </div>

      <div className={`${styles.step} ${activeStep >= 2 ? styles.active : styles.disabled}`}>
        {activeStep === 2 ? (
          <>
            <h3>2. Fraktsätt</h3>
            <ShippingForm onSubmitSuccess={handleShippingSubmit} />
          </>
        ) : (
          checkoutData.shipping && (
            <div className={styles.savedSummary}>
              <h3>2. Fraktsätt ✓</h3>
              <p>Fraktmetod sparad</p>
            </div>
          )
        )}
      </div>

      <div className={`${styles.step} ${activeStep >= 3 ? styles.active : styles.disabled}`}>
        {activeStep === 3 ? (
          <>
            <h3>3. Betalningssätt</h3>
            <PaymentForm onSubmitSuccess={handlePaymentSubmit} />
          </>
        ) : (
          checkoutData.payment && (
            <div className={styles.savedSummary}>
              <h3>3. Betalningssätt ✓</h3>
              <p>Betalmetod sparad</p>
            </div>
          )
        )}
      </div>

      <button 
        className={styles.payButton}
        disabled={!isAllStepsCompleted} 
        onClick={handleFinalPayment}
      >
        Betala
      </button>
    </div>
  );
}
