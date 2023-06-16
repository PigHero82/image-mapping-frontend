// Components
import BreadCrumbs from "@core/components/breadcrumbs"
import { Card, CardHeader, CardTitle, Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { ActionButton, AddButton, ShowButton, FileUploaderSingle, Datatable, InputMask, NewInput } from "components"

// API
import { Api } from "./functions"
import { useMutation, useQuery } from "react-query"

// Functions
import { errorValidation, handleFetch, numberFormat, regex, toast } from "functions"

// Third-Party Library
import useToggle from "@react-hook/toggle"
import { useSelector } from "react-redux"

// Form
import * as yup from 'yup'
import { Formik } from "formik"

const index = () => {
  // Variables
  const title = "Product"
  const paramsKey = "master_product"

  // Hooks
  const state = useSelector(state => state.fetchParams)
  const [isModal, toggleModal] = useToggle(false, true)

  const getData = useQuery(
    ['master-product'],
    () => Api.index(handleFetch(state[paramsKey]))
  )

  const columns = [
    {
      name: 'Aksi',
      maxWidth: '50px',
      center: true,
      cell: (_row, index) => <ShowButton id={`editbutton-${index}`} onClick={() => {}} />
    },
    {
      name: 'Nama',
      selector: row => row.name,
      sortable: true,
      sortField: 'name'
    },
    {
      name: 'Harga',
      cell: (row, index) => <div key={index}>Rp{numberFormat(row.price)}</div>,
      sortable: true,
      sortField: 'price'
    }
  ]

  const ModalSection = () => {
    const storeData = useMutation(value => Api.store(value), {
      onSuccess: res => {
        toast('success', "Success", res.data.message)
        toggleModal()
        getData.refetch()
      },
      onError: err => {
        const error = err.response.data
        toast('danger', "Error", error.message)
        errorValidation(setError, error.errors)
      }
    })

    return (
      <Modal isOpen={true} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Add Product
        </ModalHeader>

        <Formik
          initialValues={{
            name: "",
            image: "",
            price: null
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required(regex().required.label),
            image: yup.string().required(regex().required.label),
            price: yup.number().typeError(regex().typeError.label).required(regex().required.label).nullable()
          })}
          onSubmit={(values) => {
            storeData.mutateAsync(values)
          }}
        >
          {({ errors, touched, values, handleChange, handleSubmit, setValues, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <NewInput
                  label="Nama"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  errors={Boolean(errors.name && touched.name) && errors.name}
                />

                <InputMask
                  label="Harga"
                  onChange={e => {
                    const value = e.target.rawValue && e.target.rawValue !== "" ? e.target.rawValue : null

                    setFieldValue('price', value)
                  }}
                  value={values.price}
                  errors={Boolean(errors.price && touched.price) && errors.price}
                />

                <FileUploaderSingle
                  label="Upload File"
                  directory="mapping"
                  errors={Boolean(errors.image && touched.image) && errors.image}
                  value={values.image}
                  accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                  onChange={e => {
                    setValues({
                      ...values,
                      image: e.dir
                    })
                  }}
                />
              </ModalBody>

              <ModalFooter>
                <ActionButton
                  type="submit"
                  color="primary"
                  loading={storeData.isLoading}
                />
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    )
  }

  return (
    <>
      <BreadCrumbs title={title} data={[{ title: 'Master' }, { title }]} />

      <Card>
        <CardHeader className="border-bottom d-flex justify-content-justify">
          <CardTitle>Data {title}</CardTitle>

          <AddButton onClick={toggleModal} />
        </CardHeader>

        <Datatable
          input={state[paramsKey]}
          dataInput={getData.data}
          data={getData.data?.data ?? []}
          page={{
            loading: getData.isLoading,
            status: !getData.isError
          }}
          columns={columns}
          paramsKey={paramsKey}
        />

        {isModal && <ModalSection />}
      </Card>
    </>
  )
}

export default index