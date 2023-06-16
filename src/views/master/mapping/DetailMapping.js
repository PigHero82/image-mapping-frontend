// Components
import BreadCrumbs from "@core/components/breadcrumbs"
import { ButtonGroup, Card, CardHeader, CardTitle, Form, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap"
import { ActionButton, AddButton, ShowButton, FileUploaderSingle, Th, BackButton, NewInput, EditButton } from "components"

// API
import { Api, DetailApi } from "./functions"
import { useMutation, useQuery } from "react-query"

// Functions
import { errorValidation, fileName, regex, toast } from "functions"

// Third-Party Library
import useToggle from "@react-hook/toggle"
import { useNavigate, useParams } from "react-router-dom"

// Form
import * as yup from 'yup'
import { Formik } from "formik"
import { Edit2 } from "react-feather"

const DetailMapping = () => {
  // Variables
  const title = "Detail Mapping"

  // Hooks
  const navigate = useNavigate()
  const { id } = useParams()
  const [isModal, toggleModal] = useToggle(false, true)

  const getData = useQuery(
    ['master-mapping-detailMapping'],
    () => Api.show(id)
  )
  const updateDefault = useMutation(id => DetailApi.update_default(id), {
    onSuccess: res => {
      toast('success', "Success", res.data.message)
      getData.refetch()
    }
  })

  const ModalSection = () => {
    return (
      <Modal isOpen={true} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Add Mapping
        </ModalHeader>

        <Formik
          initialValues={{
            mapping_id: id,
            max_dimension: 700,
            name: "",
            image: null,
            width: null,
            height: null
          }}
          validationSchema={yup.object().shape({
            name: yup.string().required(regex().required.label),
            image: yup.string().required(regex().required.label).nullable()
          })}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            DetailApi.store(values).then(res => {
              toast('success', "Success", res.data.message)
              toggleModal()
              getData.refetch()
            }).catch(err => {
              const error = err.response.data
              toast('danger', "Error", error.message)
              errorValidation(error.errors, setErrors)
            }).finally(() => {
              setSubmitting(false)
            })
          }}
        >
          {({ errors, isSubmitting, touched, values, handleChange, handleSubmit, setValues }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <NewInput
                  label="Nama"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  errors={Boolean(errors.name && touched.name) && errors.name}
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
                      ...e.dimensions,
                      image: e.dir
                    })
                  }}
                />
              </ModalBody>

              <ModalFooter>
                <ActionButton
                  type="submit"
                  color="primary"
                  loading={isSubmitting}
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
      <BreadCrumbs
        title={title}
        data={[{ title: 'Master' }, { title: 'Mapping' }, { title }]}
        rightItem={(
          <BackButton onClick={() => navigate(-1)} />
        )}
      />

      <Card>
        <CardHeader className="border-bottom d-flex justify-content-justify">
          <CardTitle>Data {title}</CardTitle>

          <AddButton onClick={toggleModal} />
        </CardHeader>

        <Table responsive hover striped>
          <thead>
            <tr className="text-center">
              <th style={{ width: 10 }}>Aksi</th>
              <th style={{ width: 10 }}>Gambar</th>
              <th style={{ width: 10 }}>Default</th>
              <th>Nama</th>
            </tr>
          </thead>

          <tbody>
            {getData.data?.details?.map((val, index) => (
              <tr key={index}>
                <td>
                  <ButtonGroup>
                    <ShowButton id={`showbutton-${index}`} onClick={() => navigate(`/master/mapping/image/${val.id}`)} />

                    <ActionButton
                      id={`actionbutton-${index}`}
                      className="px-50"
                      color="warning"
                      size="sm"
                      tooltipText="Ubah Default"
                      loading={updateDefault.isLoading}
                      onClick={() => updateDefault.mutate(val.id)}
                    >
                      <Edit2 size={14} />
                    </ActionButton>
                  </ButtonGroup>
                </td>
                <td>
                  <img key={index} className='rounded' alt={fileName(val.image)} src={`${process.env.REACT_APP_BASE_URL}/${val.image}`} height='100' />
                </td>
                <td>{val.is_default ? "Ya" : "Tidak"}</td>
                <td>{val.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {isModal && <ModalSection />}
      </Card>
    </>
  )
}

export default DetailMapping