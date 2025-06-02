import ReactFullpage from '@fullpage/react-fullpage';
import WelcomeUser from './Section/WelcomeUser';
import CompanyInformation from './Section/CompanyInformation';
import { useForm } from 'react-hook-form';
import { Company } from '@/types/company';
import { useTranslation } from 'react-i18next';
import CompanyAddress from './Section/CompanyAddress';
import { postSettingCompanyStore } from '@/actions/settingAction';
import { useAppDispatch } from '@/hooks/use-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { use } from 'i18next';
import { getProfileShow } from '@/actions/profileAction';

export default function CompanyCreateFullPage() {
    const { t } = useTranslation('dashboard');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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

    const settingCompanyStoreRedux = useSelector((state: RootState) => state.setting.company.store);
    const profileShowRedux = useSelector((state: RootState) => state.profile.show);

    const onSubmit = (data: Company) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description || "");
        formData.append("vat_number", data.vat_number || "");
        formData.append("kvk_number", data.kvk_number || "");
        formData.append("website", data.website || "");
        formData.append("email", data.email || "");
        formData.append("phone", data.phone || "");

        if (data.address) {
            formData.append("address[street]", data.address.street || "");
            formData.append("address[postal_code]", typeof data.address.postal_code === "object"
                ? data.address.postal_code.value
                : data.address.postal_code || "");
            formData.append("address[house_number]", data.address.house_number || "");
            formData.append("address[house_number_addition]", data.address.house_number_addition || "");
            formData.append("address[city]", data.address.city || "");
            formData.append("address[province]", data.address.province || "");
        }

        if (data.image && data.image instanceof File) {
            formData.append("image", data.image);
        }

        dispatch(postSettingCompanyStore(formData));
    };

    // Redirect to dashboard on success submission
    useEffect(() => {
        if (settingCompanyStoreRedux.success) {
            navigate('/');
        }
    }, [settingCompanyStoreRedux.success, navigate]);

    // Fetch profile on mount
    useEffect(() => {
        dispatch(getProfileShow());
    }, []);


    // Redirect to dashboard if company already exists
    useEffect(() => {
        if (profileShowRedux.result?.has_main_company) {
            navigate('/');
        }
    }, [profileShowRedux.result, navigate]);

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
        <div className="flex flex-col p-[24px] items-center justify-center">
            <CompanyInformation
                register={register}
                control={control}
                watch={watch}
                setValue={setValue}
                errors={errors}
                onSubmit={handleSubmit(onSubmit)}
                t={t}
            />
        </div>
    )
}