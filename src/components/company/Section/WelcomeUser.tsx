import { fullpageApi } from "@fullpage/react-fullpage";

export default function WelcomeUser({
    state, fullpageApi
}: {
    state: unknown;
    fullpageApi: fullpageApi;
}) {
    return (
        <div className="section">
            <div className="sm:h-screen w-full bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center text-white px-6">
                <div className="max-w-md text-center">
                    <h1 className="text-4xl font-extrabold mb-4">Welcome to Flexavi 🎉</h1>
                    <p className="text-lg mb-8 text-blue-100">
                        We're excited to have you on board. Let's get you set up and ready to go!
                    </p>

                    <button
                        className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition"
                        onClick={() => {
                            fullpageApi.moveSectionDown();
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
}
