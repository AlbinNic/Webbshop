import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Form.module.css";

const paymentSchema = z.object({
    shipping: z.enum(["Kort", "Swish", "Klarna", "PayPal"]),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
    onSubmitSuccess: (data: PaymentFormData) => void;
}

export function PaymentForm({ onSubmitSuccess }: PaymentFormProps) {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
        mode: "all",
    });

    function submit(data: PaymentFormData) {
        console.log("Payment:", data);
        onSubmitSuccess(data);
    }

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit(submit)}>
            <h2 className={styles.title}>Betalsätt</h2>

            <div className={styles.radioGroup}>
            <label>
                <input type="radio" value="Kort" {...register("shipping")} />
                Kort
            </label>
            <label>
                <input type="radio" value="Swish" {...register("shipping")} />
                Swish
            </label>
            <label>
                <input type="radio" value="Klarna" {...register("shipping")} />
                Klarna
            </label>
            <label>
                <input type="radio" value="PayPal" {...register("shipping")} />
                PayPal
            </label>
            </div>

            {errors.shipping && <p className={styles.error}>Du måste välja ett betalsätt!</p>}

            <button className={styles.button} disabled={!isValid}>Slutför</button>
        </form>
    )
}