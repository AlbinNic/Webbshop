import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Form.module.css";

const shippingSchema = z.object({
    shipping: z.enum(["DHL", "Schenker", "PostNord", "Early Bird", "Instabox", "Bring"]),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

interface ShippingFormProps {
    onSubmitSuccess: (data: ShippingFormData) => void;
}

export function ShippingForm({ onSubmitSuccess }: ShippingFormProps) {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ShippingFormData>({
        resolver: zodResolver(shippingSchema),
        mode: "all",
    });

    function submit(data: ShippingFormData) {
        console.log("Shipping:", data);
        onSubmitSuccess(data);
    }

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit(submit)}>
            <h2 className={styles.title}>Fraktsätt</h2>

            <div className={styles.radioGroup}>
            <label>
                <input type="radio" value="DHL" {...register("shipping")} />
                DHL
            </label>
            <label>
                <input type="radio" value="Schenker" {...register("shipping")} />
                Schenker
            </label>
            <label>
                <input type="radio" value="PostNord" {...register("shipping")} />
                PostNord
            </label>
            <label>
                <input type="radio" value="Early Bird" {...register("shipping")} />
                Early Bird
            </label>
            <label>
                <input type="radio" value="Instabox" {...register("shipping")} />
                Instabox
            </label>
            <label>
                <input type="radio" value="Bring" {...register("shipping")} />
                Bring
            </label>
            </div>

            {errors.shipping && <p className={styles.error}>Du måste välja ett fraktsätt!</p>}

            <button className={styles.button} disabled={!isValid}>Nästa</button>
        </form>
    )
}