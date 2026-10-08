import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const customerSchema = z.object({
    name: z.string().min(2, "Namnet måste vara minst två tecken"),
    adress: z.string().min(5, "Adressen måste vara minst fem tecken"),
});

type CustomerFormData = z.infer<typeof customerSchema>;

export function CustomerForm() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(customerSchema),
        mode: "onChange",
    });
    function submit(data: CustomerFormData) {
        console.log("Customer data:", data)
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <label>
                Namn
                <input {...register("name")} />
            </label>
            {errors.name && <p>{errors.name.message}</p>}

            <label>
                Adress
                <input {...register("adress")} />
            </label>
            {errors.adress && <p>{errors.adress.message}</p>}

            <button disabled={!isValid}>Nästa</button>
        </form>
    )
}