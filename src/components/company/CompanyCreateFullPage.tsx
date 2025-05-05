import ReactFullpage from '@fullpage/react-fullpage';
import WelcomeUser from './Section/WelcomeUser';
import CompanyInformation from './Section/CompanyInformation';
import { useForm } from 'react-hook-form';
import { Company } from '@/types/company';
import { useTranslation } from 'react-i18next';
import CompanyAddress from './Section/CompanyAddress';
import { useState } from 'react';

export default function CompanyCreateFullPage() {
    const { t } = useTranslation('dashboard');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        control,
        setValue,
        trigger
      } = useForm<Company>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            city: '',
            kvk: '',
            website: '',
            logo: '',
            postal_code: {
                value: '',
            },
            house_number: '',
            house_number_addition: '',
            street: '',
            province: '',
            created_at: '',
            updated_at: '',
        }
      });

      const [isSubmitting, setIsSubmitting] = useState(false);
      const [isSuccess, setIsSuccess] = useState(false);
      const [activeSection, setActiveSection] = useState(0);
    
      const onSubmit = (data) => {
        setIsSubmitting(true);
        
        setTimeout(() => {
          console.log('Form data:', data);
          setIsSubmitting(false);
          setIsSuccess(true);
          reset();
        }, 1500);
      };
    
    const validateSection = async (origin, destination) => {
        if (origin.index === 0 && destination.index === 1) {
            const isValid = await trigger(['name', 'kvk', 'website']);
            return isValid;
        }
        
        if (origin.index === 1 && destination.index === 2) {
            const isValid = await trigger(['email', 'phone', 'postal_code', 'house_number', 'street', 'city']);
            return isValid;
        }
        
        return true;
    };

    return (
        <ReactFullpage
            licenseKey={'asd'}
            scrollingSpeed={1000}
            credits={{
                enabled: false,
                label: 'Made with fullPage.js',
                position: 'right',
            }}
            navigation={true}
            onLeave={(origin, destination, direction) => {
                return validateSection(origin, destination);
              }}
            afterLoad={(origin, destination) => {
                setActiveSection(destination.index);
            }}
            render={({ state, fullpageApi }) => {
                return (
                    <ReactFullpage.Wrapper>
                        <WelcomeUser
                            state={state}
                            fullpageApi={fullpageApi}
                            t={t}
                        />

                        <CompanyInformation
                            state={state}
                            fullpageApi={fullpageApi}
                            register={register}
                            control={control}
                            errors={errors}
                            handleSubmit={handleSubmit}
                            t={t}
                        />
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
                    </ReactFullpage.Wrapper >
                );
            }}
        />
    )
}