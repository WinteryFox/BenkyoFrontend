import {createDeck, CreateDeckRequest} from "../../../src/Api";
import {GetStaticProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {Formik, FormikErrors} from "formik";
import {useTranslation} from "next-i18next";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Checkbox from "../../../components/Checkbox";
import TextArea from "../../../components/TextArea";
import {useRouter} from "next/router";

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!))
        }
    }
}

export default function Index() {
    const router = useRouter()
    const {t} = useTranslation()
    const initialValues: CreateDeckRequest = {
        name: "",
        shortDescription: "",
        description: "",
        targetLanguage: "",
        sourceLanguage: "",
        isPrivate: false
    }

    // TODO: Prevent user leaving page without saving
    return (
        <Formik
            onSubmit={async (values, {setSubmitting, setErrors}) => {
                const errors: FormikErrors<CreateDeckRequest> = {}
                try {
                    const deck = await createDeck(values)
                    if (deck == null) {
                        // TODO
                        return
                    }

                    await router.push(`/decks/${deck.id}`)
                } catch (e: any) {
                    // TODO
                }
                setErrors(errors)
                setSubmitting(false)
            }}
            initialValues={initialValues}
            validate={(values: CreateDeckRequest) => {
                const errors: FormikErrors<CreateDeckRequest> = {}

                if (!values.name)
                    errors.name = t("required")

                if (!values.shortDescription)
                    errors.shortDescription = t("required")

                if (!values.description)
                    errors.description = t("required")

                if (!values.sourceLanguage)
                    errors.sourceLanguage = t("required")

                if (!values.targetLanguage)
                    errors.targetLanguage = t("required")

                return errors
            }}>
            {({
                  touched,
                  errors,
                  values,
                  handleChange,
                  handleSubmit,
                  isSubmitting
              }) => (
                <form onSubmit={handleSubmit}
                      className={"z-10 flex flex-col rounded-3xl max-w-lg w-full p-8 bg-white shadow"}>
                    <Input id={"name"} value={values.name} onChange={handleChange} error={!!errors.name && touched.name}>
                        {t("name")} <span className={"text-xs"}>{errors.name && touched.name && errors.name}</span>
                    </Input>

                    <Input id={"shortDescription"} value={values.shortDescription} onChange={handleChange} error={!!errors.shortDescription && touched.shortDescription}>
                        {t("short-description")} <span>{errors.shortDescription && touched.shortDescription && errors.shortDescription}</span>
                    </Input>

                    <TextArea id={"description"} value={values.description} onChange={handleChange} error={!!errors.description && touched.description}>
                        {t("description")} <span>{errors.description && touched.description && errors.description}</span>
                    </TextArea>

                    <Input id={"sourceLanguage"} value={values.sourceLanguage} onChange={handleChange} error={!!errors.sourceLanguage && touched.sourceLanguage}>
                        {t("source-language")} <span>{errors.sourceLanguage && touched.sourceLanguage && errors.sourceLanguage}</span>
                    </Input>

                    <Input id={"targetLanguage"} value={values.targetLanguage} onChange={handleChange} error={!!errors.targetLanguage && touched.targetLanguage}>
                        {t("target-language")} <span>{errors.targetLanguage && touched.targetLanguage && errors.targetLanguage}</span>
                    </Input>

                    <Checkbox id={"isPrivate"} checked={values.isPrivate} onChange={handleChange}>
                        {t("private")}
                    </Checkbox>

                    <Button type={"submit"} className={"btn-violet"} disabled={isSubmitting}>
                        {t("create-deck")}
                    </Button>
                </form>)}
        </Formik>
    )
}