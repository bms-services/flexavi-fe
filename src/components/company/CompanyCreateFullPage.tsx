import ReactFullpage from '@fullpage/react-fullpage';
import WelcomeUser from './Section/WelcomeUser';
import CompanyInformation from './Section/CompanyInformation';

export default function CompanyCreateFullPage() {
     const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: 'onChange', 
        defaultValues: {
            companyName: '',
            taxId: '',
            kvk: '',
            website: '',
        },
    });

    
    return (
        <div>
            <ReactFullpage
                licenseKey={'asd'}
                scrollingSpeed={1000}
                credits={{
                    enabled: false,
                    label: 'Made with fullPage.js',
                    position: 'right',
                }}
                render={({ state, fullpageApi }) => {
                    const handleNext = () => {
                        if (isValid) {
                            fullpageApi.moveSectionDown();
                        } else {
                            alert('Harap lengkapi form sebelum melanjutkan.');
                        }
                    };
                    
                    return (
                        <ReactFullpage.Wrapper>
                            <WelcomeUser
                                state={state}
                                fullpageApi={fullpageApi}
                            />

                            <CompanyInformation
                                state={state}
                                fullpageApi={fullpageApi}
                            />
                        </ReactFullpage.Wrapper>
                    );
                }}
            />
        </div>
    )
}