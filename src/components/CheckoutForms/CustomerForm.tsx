import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Form.module.css";

const customerSchema = z.object({
    firstname: z.string().min(2, "Namnet måste vara minst två tecken"),
    lastname: z.string().min(2, "Namnet måste vara minst två tecken"),
    adress: z.string().min(5, "Adressen måste vara minst fem tecken"),
    postnummer: z.string().regex(/^\d{5}$/, "Ange ett korrekt postnummer"),
    postort: z.string().min(2, "Postort måste vara minst två bokstäver"),
    mobilnummer: z.string().regex(/^07\d{8}$/, "Ange ett korrekt mobilnummer"),
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Ange en giltig e-postadress"),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerFormProps {
    onSubmitSuccess: (data: CustomerFormData) => void;
}

export function CustomerForm({ onSubmitSuccess }: CustomerFormProps) {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(customerSchema),
        mode: "onChange",
    });
    function submit(data: CustomerFormData) {
        console.log("Customer data:", data)
        onSubmitSuccess(data);
    }

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit(submit)}>
            <h2 className={styles.title}>Dina uppgifter</h2>

            <div className={styles.formField}>
                <label htmlFor="firstname">Förnamn</label>
                <input id="firstname" {...register("firstname")} />
                {errors.firstname && <p className={styles.error}>{errors.firstname.message}</p>}
            </div>

            <div className={styles.formField}>
                <label htmlFor="lastname">Efternamn</label>
                <input id="lastname" {...register("lastname")} />
                {errors.lastname && <p className={styles.error}>{errors.lastname.message}</p>}
            </div>

            <div className={styles.formField}>
                <label htmlFor="adress">Adress</label>
                <input id="adress" {...register("adress")} />
                {errors.adress && <p className={styles.error}>{errors.adress.message}</p>}
            </div>

            <div className={styles.formField}>
                <label htmlFor="postnummer">Postnummer</label>
                <input id="postnummer" {...register("postnummer")} />
                {errors.postnummer && <p className={styles.error}>{errors.postnummer.message}</p>}
            </div>

            <div className={styles.formField}>
                <label htmlFor="postort">Postort</label>
                <input id="postort" {...register("postort")} />
                {errors.postort && <p className={styles.error}>{errors.postort.message}</p>}
            </div>

            <div className={styles.formField}>
                <label htmlFor="mobilnummer">Mobilnummer</label>
                <input id="mobilnummer" {...register("mobilnummer")} />
                {errors.mobilnummer && <p className={styles.error}>{errors.mobilnummer.message}</p>}
            </div>

             <div className={styles.formField}>
                <label htmlFor="email">Email</label>
                <input id="email" {...register("email")} />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>

            <button className={styles.button} disabled={!isValid}>Nästa</button>
        </form>
    )
}