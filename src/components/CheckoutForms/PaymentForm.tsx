import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const paymentSchema = z.object({
    shipping: z.enum(["Kort", "Swish", "Klarna", "PayPal"]),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export function PaymentForm() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<PaymentFormData>({
        resolver: zodResolver(paymentSchema),
        mode: "all",
    });

    function submit(data: PaymentFormData) {
        console.log("Payment:", data);
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h2>Betalsätt</h2>
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

            {errors.shipping && <p>Du måste välja ett betalsätt!</p>}

            <button disabled={!isValid}>Slutför</button>
        </form>
    )
}