// Components
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Form } from "reactstrap"
import { ActionButton, ImageMapper } from "components"

// Form
import { Formik } from "formik"
import * as yup from "yup"

export const MappingSection = ({ baseData, data, onSubmit }) => (
  <Card>
    <CardHeader>
      <CardTitle>Mapping Data</CardTitle>
    </CardHeader>

    <Formik
      initialValues={{ detail: data }}
      validationSchema={yup.object().shape({
        detail: yup.array().label("Koordinat").min(1)
      })}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values, setFieldValue, handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <CardBody>
              <ImageMapper
                label="Image Mapper"
                errors={Boolean(errors.detail && touched.detail) && errors.detail}
                image={`${process.env.REACT_APP_BASE_URL}${baseData.image}`}
                width={baseData.width}
                height={baseData.height}
                value={values.detail.map(val => {
                  return {
                    ...val,
                    label: val.name
                  }
                })}
                onChange={(e) => {
                  setFieldValue('detail', [
                    ...values.detail,
                    e
                  ])
                }}
                onDelete={((_, index) => {
                  const data = [...values.detail]
                  data.splice(index, 1)
    
                  setFieldValue('detail', data)
                })}
              />
            </CardBody>

            <CardFooter>
              <ActionButton type="submit">Submit</ActionButton>
            </CardFooter>
          </Form>
        )
      }}
    </Formik>
  </Card>
)