// Components
import BreadCrumbs from "@core/components/breadcrumbs"
import { ButtonGroup, Card, CardHeader, CardTitle, Form, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { ActionButton, AddButton, Datatable, Input, ShowButton } from "components"

// API
import { Api } from "./functions"
import { useMutation, useQuery } from "react-query"

// Functions
import { errorValidation, handleFetch, regex, toast } from "functions"

// Redux
import { useSelector } from "react-redux"

// Third-Party Library
import useToggle from "@react-hook/toggle"
import { useNavigate } from "react-router-dom"

// Form
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'

// Icons
import { Play } from "react-feather"

const index = () => {
  // Variables
  const title = "Mapping"
  const paramsKey = "master_mapping"

  // Hooks
  const navigate = useNavigate()
  const state = useSelector(state => state.fetchParams)
  const [isModal, toggleModal] = useToggle(false, true)

  const getData = useQuery(
    ['master-mapping', state[paramsKey]],
    () => Api.index(handleFetch(state[paramsKey]))
  )

  const columns = [
    {
      name: 'Aksi',
      maxWidth: '50px',
      center: true,
      cell: (row, index) => {
        return (
          <ButtonGroup>
            <ShowButton
              id={`editbutton-${index}`}
              onClick={() => navigate(`/master/mapping/detail/${row.id}`)}
            />

            <ActionButton
              className="px-50"
              color="primary"
              id={`actionbutton-${index}`}
              size="sm"
              tooltipText="Mulai Simulasi Mapping"
              onClick={() => navigate(`simulasi/${row.id}`)}
            >
              <Play size={14} />
            </ActionButton>
          </ButtonGroup>
        )
      }
    },
    {
        name: 'Nama',
        selector: row => row.name,
        sortable: true,
        sortField: 'name'
    }
  ]

  const ModalSection = () => {
    const {
      handleSubmit,
      register,
      setError,
      formState: {
        errors
      }
    } = useForm({
      defaultValues: {
        name: ""
      },
      resolver: yupResolver(yup.object().shape({
        name: yup.string().required(regex().required.label)
      }))
    })

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

    const onSubmit = data => {
      return new Promise(resolve => {
        storeData.mutateAsync(data).finally(() => {
          resolve()
        })
      })
    }

    return (
      <Modal isOpen={true} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Add Mapping
        </ModalHeader>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Input
              label="Nama"
              name="name"
              register={register}
              errors={errors.name}
            />
          </ModalBody>

          <ModalFooter>
            <ActionButton
              type="submit"
              loading={storeData.isLoading}
              color="primary"
            />
          </ModalFooter>
        </Form>
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