import { useEffect } from "react";
import { useMatches } from "react-router-dom";

export function usePageTitle() {
    const matches = useMatches();

    useEffect(() => {
        const match = matches
            .slice()
            .reverse()
            .find(
                (m) =>
                    typeof m.handle === "object" &&
                    m.handle !== null &&
                    "title" in m.handle
            );

        if (match && typeof match.handle === "object" && match.handle !== null && "title" in match.handle) {
            const handle = match.handle as { title: string | (() => string) };
            const title = typeof handle.title === "string"
                ? handle.title
                : handle.title();

            document.title = `Flexavi | ${title}`;
        } else {
            document.title = "Flexavi";
        }
    }, [matches]);
}