import { AddressRes } from "@/zustand/types/addressT";

export function AddressJSX({ address }: { address: AddressRes }) {
    const postalCode =
        typeof address.postal_code === "object"
            ? address.postal_code.value
            : address.postal_code;

    return (
        <address className="not-italic">
            {address.street} {address.house_number}
            {address.house_number_addition ? address.house_number_addition : ""}
            <br />
            {postalCode} {address.city}
            {address.province ? <br /> : null}
            {address.province}
        </address>
    );
}