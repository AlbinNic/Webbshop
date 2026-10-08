import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const customerSchema = z.object({
    name: z.string().min(2, "Namnet måste vara minst två tecken"),
    adress: z.string().min(5, "Adressen måste vara minst fem tecken"),
    postnummer: z.string().regex(/^\d{5}$/, "Ange ett korrekt postnummer"),
    postort: z.string().min(2, "Postort måste vara minst två bokstäver"),
    mobilnummer: z.string().regex(/^07\d{8}$/, "Ange ett korrekt mobilnummer"),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Ange en giltig e-postadress"),
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
            <h2>Dina uppgifter</h2>
            <label>
                Förnamn
                <input {...register("name")} />
            </label>
            {errors.name && <p>{errors.name.message}</p>}
            <label>
                Efternamn
                <input {...register("name")} />
            </label>
            {errors.name && <p>{errors.name.message}</p>}

            <label>
                Adress
                <input {...register("adress")} />
            </label>
            {errors.adress && <p>{errors.adress.message}</p>}
            <label>
                Postnummer
                <input {...register("postnummer")} />
            </label>
            {errors.postnummer && <p>{errors.postnummer.message}</p>}
            <label>
                Postort
                <input {...register("postort")} />
            </label>
            {errors.postort && <p>{errors.postort.message}</p>}

            <label>
                Mobilnummer
                <input {...register("mobilnummer")} />
            </label>
            {errors.mobilnummer && <p>{errors.mobilnummer.message}</p>}
            <label>
                Email
                <input {...register("email")} />
            </label>
            {errors.email && <p>{errors.email.message}</p>}

            <button disabled={!isValid}>Nästa</button>
        </form>
    )
}