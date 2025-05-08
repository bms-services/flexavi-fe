import ReactFullpage from '@fullpage/react-fullpage';
import WelcomeUser from './Section/WelcomeUser';
import CompanyInformation from './Section/CompanyInformation';
import { useForm } from 'react-hook-form';
import { Company } from '@/types/company';
import { useTranslation } from 'react-i18next';
import CompanyAddress from './Section/CompanyAddress';

export default function CompanyCreateFullPage() {
    const { t } = useTranslation('dashboard');

    const {
        control,
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors, isValid }
    } = useForm<Company>({
        defaultValues: {
            name: '',
            kvk: '',
            website: '',
        },
    })

    return (
        <ReactFullpage
            licenseKey={'asd'}
            scrollingSpeed={1000}
            credits={{
                enabled: false,
                label: 'Made with fullPage.js',
                position: 'right',
            }}
            easingcss3='cubic-bezier(0.175, 0.885, 0.320, 1.275)'
            slidesNavPosition='bottom'
            scrollHorizontally={true}
            slidesNavigation={true}
            scrollHorizontallyKey='horizontal'
            controlArrows={true}
            controlArrowColor='#fff'
            controlArrowsHTML={[
                `<div class="fp-prev transition-all duration-300 transform hover:scale-110 hover:-translate-x-1">
                    <div class="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                 </div>`,
                `<div class="fp-next transition-all duration-300 transform hover:scale-110 hover:translate-x-1">
                    <div class="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                 </div>`
            ]}

            // beforeLeave={(origin, destination, direction) => {
            //     if (origin.index === 1 && direction === 'down') {
            //         if (!isValid) {
            //             return false;
            //         }
            //     }
            // }}
            render={({ state, fullpageApi }) => {
                return (
                    <ReactFullpage.Wrapper>
                        <WelcomeUser
                            state={state}
                            fullpageApi={fullpageApi}
                            t={t}
                        />

                        <div className='section'>
                            <div className="slide">
                                <CompanyInformation
                                    state={state}
                                    fullpageApi={fullpageApi}
                                    register={register}
                                    control={control}
                                    errors={errors}
                                    handleSubmit={handleSubmit}
                                    t={t}
                                />
                            </div>
                            <div className="slide">
                                <CompanyAddress
                                    state={state}
                                    fullpageApi={fullpageApi}
                                    register={register}
                                    control={control}
                                    errors={errors}
                                    watch={watch}
                                    setValue={setValue}
                                    handleSubmit={handleSubmit}
                                    t={t}
                                />
                            </div>
                        </div>
                    </ReactFullpage.Wrapper >
                );
            }}
        />
    )
}