import { CustomerForm } from "../components/CheckoutForms/CustomerForm";
import { PaymentForm } from "../components/CheckoutForms/PaymentForm";
import { ShippingForm } from "../components/CheckoutForms/ShippingForm";


export function TestPage() {
  return (
    <div>
      <h1>Testar formulär</h1>
      <CustomerForm />
      <ShippingForm />
      <PaymentForm />
    </div>
  );
}