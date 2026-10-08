import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const shippingSchema = z.object({
    shipping: z.enum(["DHL", "Schenker", "PostNord", "Early Bird", "Instabox", "Bring"]),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export function ShippingForm() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ShippingFormData>({
        resolver: zodResolver(shippingSchema),
        mode: "onTouched",
    });

    function submit(data: ShippingFormData) {
        console.log("Shipping:", data);
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <h2>Fraktsätt</h2>
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

            {errors.shipping && <p>Du måste välja ett fraktsätt!</p>}

            <button disabled={!isValid}>Nästa</button>
        </form>
    )
}