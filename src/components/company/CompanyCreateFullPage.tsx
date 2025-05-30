import ReactFullpage from '@fullpage/react-fullpage';
import WelcomeUser from './Section/WelcomeUser';
import CompanyInformation from './Section/CompanyInformation';
import { useForm } from 'react-hook-form';
import { Company } from '@/types/company';
import { useTranslation } from 'react-i18next';
import CompanyAddress from './Section/CompanyAddress';
import { postSettingCompanyStore } from '@/actions/settingAction';
import { useAppDispatch } from '@/hooks/use-redux';

export default function CompanyCreateFullPage() {
    const { t } = useTranslation('dashboard');
    const dispatch = useAppDispatch();
    const {
        control,
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors }
    } = useForm<Company>({
        defaultValues: {
            name: '',
            description: '',
            vat_number: '',
            kvk_number: '',
            website: '',
            email: '',
            phone: '',
            logo_url: '',
            logo_public_id: '',
            address: {
                street: '',
                postal_code: { label: '', value: '' },
                house_number: '',
                house_number_addition: '',
                city: '',
                province: '',
            },
        },
    })

    const onSubmit = (data: Company) => {
        dispatch(postSettingCompanyStore(data)).unwrap().then(
            (data) => {
                // Handle success, e.g., navigate to another page or show a success message
                console.log('Company created successfully');
                console.log(data);
                
            }
        ).catch(
            (error) => {
                // Handle error, e.g., show an error message
                console.error('Error creating company:', error);
        }
        );
    };

    return (
        // <ReactFullpage
        //     licenseKey={'asd'}
        //     scrollingSpeed={1000}
        //     credits={{
        //         enabled: false,
        //         label: 'Made with fullPage.js',
        //         position: 'right',
        //     }}
        //     easingcss3='cubic-bezier(0.175, 0.885, 0.320, 1.275)'
        //     slidesNavPosition='bottom'
        //     scrollHorizontally={true}
        //     slidesNavigation={true}
        //     scrollHorizontallyKey='horizontal'
        //     controlArrows={true}
        //     controlArrowColor='#fff'
        //     controlArrowsHTML={[
        //         `<div class="fp-prev transition-all duration-300 transform hover:scale-110 hover:-translate-x-1">
        //             <div class="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
        //                 <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        //                     <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        //                 </svg>
        //             </div>
        //         </div>`,
        //         `<div class="fp-next transition-all duration-300 transform hover:scale-110 hover:translate-x-1">
        //             <div class="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
        //               <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        //                 <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        //               </svg>
        //             </div>
        //          </div>`
        //     ]}

        //     render={({ state, fullpageApi }) => {
        //         return (
        //             <ReactFullpage.Wrapper>
        //                 <div className='section'>
        //                     <CompanyInformation
        //                         state={state}
        //                         fullpageApi={fullpageApi}
        //                         register={register}
        //                         control={control}
        //                         errors={errors}
        //                         handleSubmit={handleSubmit}
        //                         onSubmit={onSubmit}
        //                         watch={watch}
        //                         setValue={setValue}
        //                         t={t}
        //                     />
        //                 </div>

        //                 <div className='section'>
        //                     <CompanyAddress
        //                         state={state}
        //                         fullpageApi={fullpageApi}
        //                         register={register}
        //                         control={control}
        //                         errors={errors}
        //                         watch={watch}
        //                         setValue={setValue}
        //                         handleSubmit={handleSubmit}
        //                         onSubmit={onSubmit}
        //                         t={t}
        //                     />
        //                 </div>
        //             </ReactFullpage.Wrapper >
        //         );
        //     }}
        // />


        <div>
            <div className='section'>
                <CompanyInformation
                    // state={state}
                    // fullpageApi={fullpageApi}
                    register={register}
                    control={control}
                    errors={errors}
                    onSubmit={handleSubmit(onSubmit)}
                    watch={watch}
                    setValue={setValue}
                    t={t} 
                    state={undefined} 
                    fullpageApi={undefined}                />
                </div>

                {/* <div className='section'>
                    <CompanyAddress
                        // state={state}
                        // fullpageApi={fullpageApi}
                        register={register}
                        control={control}
                        errors={errors}
                        watch={watch}
                        setValue={setValue}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        t={t}
                    />
                </div> */}
        </div>
    )
}