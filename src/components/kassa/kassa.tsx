import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./kassa.css";


const customerSchema = z.object({
    name: z.string().min(2, "Ange ditt fullständiga namn"),
    address: z.string().min(5, "Ange en giltig adress"),
});

type CustomerInfo = z.infer<typeof customerSchema>;

function CustomerInfoForm({
    defaultValues,
    onSubmit,
}: {
    defaultValues?: Partial<CustomerInfo>;
    onSubmit: (data: CustomerInfo) => void;
}) {
    const { register, handleSubmit, formState: { errors } } = useForm<CustomerInfo>({
        resolver: zodResolver(customerSchema),
        defaultValues,
    });

    return (
        <form className="kassa-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="kassa-field">
                <label htmlFor="name">Namn</label>
                <input id="name" {...register("name")} />
                {errors.name && <span className="kassa-error">{errors.name.message}</span>}
            </div>

            <div className="kassa-field">
                <label htmlFor="address">Adress</label>
                <input id="address" {...register("address")} />
                {errors.address && <span className="kassa-error">{errors.address.message}</span>}
            </div>

            <button type="submit" className="kassa-form-submit">Nästa</button>
        </form>
    );
}

// ---------- Fraktsätt ----------

const shippingSchema = z.object({
    carrier: z.enum(["dhl", "schenker", "postnord"], {
        message: "Välj ett fraktsätt",
    }),
});

type ShippingInfo = z.infer<typeof shippingSchema>;

const carriers = [
    { value: "dhl", label: "DHL" },
    { value: "schenker", label: "Schenker" },
    { value: "postnord", label: "PostNord" },
] as const;

function ShippingForm({
    defaultValues,
    onSubmit,
}: {
    defaultValues?: Partial<ShippingInfo>;
    onSubmit: (data: ShippingInfo) => void;
}) {
    const { register, handleSubmit, formState: { errors } } = useForm<ShippingInfo>({
        resolver: zodResolver(shippingSchema),
        defaultValues,
    });

    return (
        <form className="kassa-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="kassa-field">
                <span className="kassa-label">Fraktsätt</span>
                {carriers.map(({ value, label }) => (
                    <label key={value} className="kassa-radio">
                        <input type="radio" value={value} {...register("carrier")} />
                        {label}
                    </label>
                ))}
                {errors.carrier && <span className="kassa-error">{errors.carrier.message}</span>}
            </div>

            <button type="submit" className="kassa-form-submit">Nästa</button>
        </form>
    );
}

// ---------- Betalningssätt ----------

const paymentSchema = z.object({
    method: z.enum(["kort", "swish", "klarna"], {
        message: "Välj ett betalningssätt",
    }),
});

type PaymentInfo = z.infer<typeof paymentSchema>;

function PaymentForm({
    defaultValues,
    onSubmit,
}: {
    defaultValues?: Partial<PaymentInfo>;
    onSubmit: (data: PaymentInfo) => void;
}) {
    const { register, handleSubmit, formState: { errors } } = useForm<PaymentInfo>({
        resolver: zodResolver(paymentSchema),
        defaultValues,
    });

    return (
        <form className="kassa-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="kassa-field">
                <span className="kassa-label">Betalningssätt</span>
                <label className="kassa-radio">
                    <input type="radio" value="kort" {...register("method")} /> Kort
                </label>
                <label className="kassa-radio">
                    <input type="radio" value="swish" {...register("method")} /> Swish
                </label>
                <label className="kassa-radio">
                    <input type="radio" value="klarna" {...register("method")} /> Klarna
                </label>
                {errors.method && <span className="kassa-error">{errors.method.message}</span>}
            </div>

            <button type="submit" className="kassa-form-submit">Nästa</button>
        </form>
    );
}

// ---------- Kassa ----------

export default function Kassa() {
    return (
        <div className="kassa-page">
            <h1>Utcheckning</h1>

            <CustomerInfoForm onSubmit={(data) => console.log(data)} />
            <ShippingForm onSubmit={(data) => console.log(data)} />
            <PaymentForm onSubmit={(data) => console.log(data)} />
        </div>
    );
}