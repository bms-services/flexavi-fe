import { fullpageApi } from "@fullpage/react-fullpage";
import { TFunction } from "i18next";
import '../style.css';

export default function WelcomeUser({
    state,
    fullpageApi,
    t
}: {
    state: unknown;
    fullpageApi: fullpageApi;
    t: TFunction<"dashboard", undefined>
}) {
    return (
        <div className="section" id="section-welcome">
            <iframe className="overlay-video"
                src="https://www.youtube.com/embed/1DZoiyKcdGI?si=LPJoVyY2Vnchc03V&autoplay=1&mute=1&controls=0&start=20" data-keepplaying="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" frameBorder="0" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

            <div className="layer">
                <div className="w-full flex flex-col items-center justify-center text-white px-6">
                    <div className="max-w-md text-center">
                        <h1 className="text-4xl font-extrabold mb-4">{t('dashboard:company_create.text.welcome')}</h1>
                        <p className="text-lg mb-8 text-blue-100">
                            {t('dashboard:company_create.text.excited')}
                        </p>

                        <button
                            className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition"
                            onClick={() => {
                                fullpageApi.moveSectionDown();
                            }}
                            type="button"
                        >
                            {t('dashboard:company_create.button.start')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
