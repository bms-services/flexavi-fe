import { Toggle } from "./toggle";
import { useLocalization } from "@/hooks/useLocalization";
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

export default function LocalizationToggle() {
    const { currentLocal, onChangeLocal } = useLocalization();

    enum LocalE {
        EN = "en",
        NL = "nl",
    }

    return (
        <Toggle
            className="absolute top-4 right-4"
            onPressedChange={onChangeLocal}
            pressed={currentLocal === LocalE.EN}
            aria-label="Toggle language"
            variant="default"
        >
            {currentLocal === LocalE.EN ? (
                <span className="text-2xl">
                    {getUnicodeFlagIcon("US")}
                </span>
            ) : (
                <span className="text-2xl">
                    {getUnicodeFlagIcon("NL")}
                </span>
            )}
        </Toggle>
    );
}
