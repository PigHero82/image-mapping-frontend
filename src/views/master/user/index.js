// React
import { Fragment } from "react"

// Components
import BreadCrumbs from "@core/components/breadcrumbs"
import { Card, CardHeader, CardTitle, Form, ModalBody, ModalFooter } from "reactstrap"
import { ActionButton, Datatable, FilterModal, Input } from "components"

// API
import UserApi from "./api/UserApi"
import { useQuery } from "react-query"

// Functions
import { handleFetch } from "functions"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { handleParam } from "redux/fetchParams"

// Third-Party Library
import useToggle from "@react-hook/toggle"

// Form
import { useForm } from "react-hook-form"

const index = () => {
  // Variables
  const title = "User"
  const paramsKey = "master_user"

  // Hooks
  const state = useSelector(state => state.fetchParams)
  const dispatch = useDispatch()
  const [showFilter, toggleFilter] = useToggle(false, true)

  const fetchData = useQuery(
    ['master-user', state[paramsKey]],
    () => UserApi.index(handleFetch(state[paramsKey]))
  )

  const columns = [
    {
        name: 'Nama',
        selector: row => row.name,
        sortable: true,
        sortField: 'name'
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
        sortField: 'email'
    }
  ]

  const FilterSection = () => {
    const {
      getValues,
      setValue,
      handleSubmit,
      formState: { isSubmitting }
    } = useForm({
      defaultValues: {
        testing: state[paramsKey]?.testing ?? undefined
      }
    })

    const onSubmit = data => {
      dispatch(handleParam({
        [paramsKey] : {
          ...state[paramsKey],
          ...data
        }
      }))
      toggleFilter()
    }

    return (
      <FilterModal toggle={toggleFilter}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Input
              label="Testing"
              name="testing"
              value={getValues('testing.api_value')}
              onChange={e => {
                setValue('testing.api_value', e.target.value)
                setValue('testing.api_label', 'testing')
                setValue('testing.value', e.target.value)
                setValue('testing.label', 'Testing')
              }}
            />
          </ModalBody>

          <ModalFooter>
            <ActionButton
              type="submit"
              loading={isSubmitting}
              color="primary"
            >
              Simpan
            </ActionButton>
          </ModalFooter>
        </Form>
      </FilterModal>
    )
  }

  return (
    <Fragment>
      <BreadCrumbs title={title} data={[{ title: 'Master' }, { title }]} />

      <Card>
        <CardHeader className="border-bottom">
          <CardTitle>Data {title}</CardTitle>
        </CardHeader>

        <Datatable
          input={state[paramsKey]}
          dataInput={fetchData.data}
          data={fetchData.data?.data ?? []}
          page={{
            loading: fetchData.isLoading,
            status: !fetchData.isError
          }}
          columns={columns}
          paramsKey={paramsKey}
          toggleFilter={toggleFilter}
        />
      </Card>

      {showFilter && <FilterSection />}
    </Fragment>
  )
}

export default index