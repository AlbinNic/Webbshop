import { useState } from 'react';
import { CustomerForm } from './CustomerForm';
import { ShippingForm } from './ShippingForm';
import { PaymentForm } from './PaymentForm';
import styles from './Form.module.css';

export default function CheckoutFlow() {
  const [activeStep, setActiveStep] = useState<number>(1);
  
  const [checkoutData, setCheckoutData] = useState<any>({
    customer: null,
    shipping: null,
    payment: null,
  });

  const handleCustomerSubmit = (data: any) => {
    setCheckoutData((prev: any) => ({ ...prev, payment: data }));
    setActiveStep(2);
  };

  const handleShippingSubmit = (data: any) => {
    setCheckoutData((prev: any) => ({ ...prev, payment: data }));
    setActiveStep(3);
  };

  const handlePaymentSubmit = (data: any) => {
    setCheckoutData((prev: any) => ({ ...prev, payment: data }));
  };

  const isAllStepsCompleted = 
    checkoutData.customer && 
    checkoutData.shipping && 
    checkoutData.payment;

  const handleFinalPayment = () => {
    console.log("Skickar order till backend:", checkoutData);
  };

  return (
    <div className={styles.checkoutWrapper}>
      
      <div className={`${styles.step} ${activeStep >= 1 ? styles.active : styles.disabled}`}>
        {activeStep === 1 ? (
          <CustomerForm onSubmitSuccess={handleCustomerSubmit} />
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
        <h3>2. Fraktsätt</h3>
        {activeStep === 2 && (
          <ShippingForm onSubmitSuccess={handleShippingSubmit} />
        )}
        {activeStep > 2 && checkoutData.shipping && <p>✓ Frakt vald</p>}
      </div>

      <div className={`${styles.step} ${activeStep >= 3 ? styles.active : styles.disabled}`}>
        <h3>3. Betalningssätt</h3>
        {activeStep === 3 && (
          <PaymentForm onSubmitSuccess={handlePaymentSubmit} />
        )}
        {checkoutData.payment && <p>✓ Betalning vald</p>}
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
