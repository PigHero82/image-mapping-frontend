// Components
import { ButtonGroup, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Form, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from "reactstrap"
import { ActionButton, DeleteButton, DropdownButton, EditButton, ImageMapper, NewInput, Select } from "components"

// Form
import { Field, Formik, useFormikContext } from "formik"
import * as yup from "yup"

// API
import { useQuery } from "react-query"
import { DropdownApi } from "api"
import { DetailApi } from "../../functions"

// Third-Party Library
import { useNavigate } from "react-router-dom"
import useToggle from "@react-hook/toggle"

// Functions
import { toast } from "functions"
import { Fragment, useEffect, useState } from "react"
import { Edit2 } from "react-feather"

export const ActionSection = ({ baseData, data, id, onBack }) => {
  // Hooks
  const navigate = useNavigate()

  const FormSection = ({ baseData, id, onBack }) => {
    // Hooks
    const { values, setFieldValue, handleSubmit } = useFormikContext()
    const [show, toggle] = useToggle(false, true)
    const [showMapping, toggleMapping] = useToggle(false, true)
    const [dataModal, setDataModal] = useState({
      key: -1,
      data: {}
    })

    // API
    const fetchDetailMapping = useQuery(['dropdown', 'detailMapping'], DropdownApi.detail_mapping)
    const fetchMappingAction = useQuery(['dropdown', 'mappingAction'], DropdownApi.mapping_action)
    const fetchProduct = useQuery(['dropdown', 'product'], DropdownApi.product)

    // Variables
    const dataMapping = fetchDetailMapping.data?.filter(val => val.value !== parseInt(id))
    
    useEffect(() => {
      if (values.detail.length === 0) {
        onBack(values)
      }
    }, [values])

    const DataModal = ({ onSubmit, toggle }) => {
      return (
        <Modal isOpen={true} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            Ubah Aksi Mapping
          </ModalHeader>

          <Formik
            initialValues={dataModal.data}
            validationSchema={yup.object().shape({
              name: yup.string().label("Nama").required(),
              action: yup.string().label("Aksi").required(),
              action_id: yup.string().label("Mapping").required()
            })}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <ModalBody>
                  <Field name='name'>
                    {({ field, meta }) => (
                      <NewInput
                        label="Nama"
                        errors={Boolean(meta.error && meta.touched) && meta.error}
                        {...field}
                      />
                    )}
                  </Field>

                  <Field name='action'>
                    {({ field, form, meta }) => {
                      return (
                        <Select
                          key='action'
                          label='Aksi'
                          errors={Boolean(meta.error && meta.touched) && meta.error}
                          {...field}
                          loading={fetchMappingAction.isLoading}
                          options={fetchMappingAction.data}
                          value={fetchMappingAction.data?.find(val => val.value === field.value)}
                          onChange={e => {
                            form.setFieldValue(field.name, e.value)
                            form.setFieldValue('action_id', "")
                          }}
                        />
                      )
                    }}
                  </Field>

                  <Field name='action_id'>
                    {({ field, form, meta }) => {
                      if (values.action === 1) {
                        return (
                          <Select
                            key='product'
                            label="Produk"
                            errors={Boolean(meta.error && meta.touched) && meta.error}
                            {...field}
                            loading={fetchProduct.isLoading}
                            options={fetchProduct.data}
                            value={fetchProduct.data?.find(val => val.value === field.value)}
                            onChange={e => form.setFieldValue(field.name, e.value)}
                          />
                        )
                      } else if (values.action === 2) {
                        return (
                          <Select
                            key='mapping'
                            label='Mapping'
                            errors={Boolean(meta.touched && meta.error) && meta.error}
                            {...field}
                            loading={fetchDetailMapping.isLoading}
                            options={dataMapping}
                            value={dataMapping?.find(val => val.value === field.value)}
                            onChange={e => form.setFieldValue(field.name, e.value)}
                          />
                        )
                      }
                    }}
                  </Field>
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

    const DataModalMapping = ({ onSubmit, toggle }) => {
      return (
        <Modal isOpen={true} toggle={toggle} size="lg">
          <ModalHeader toggle={toggle}>
            Ubah Mapping
          </ModalHeader>

          <Formik
            initialValues={{ mapping: [dataModal.data] }}
            validationSchema={yup.object().shape({
              mapping: yup.array().label("Mapping").min(1)
            })}
            onSubmit={(values) => onSubmit(values.mapping[0])}
          >
            {({ errors, isSubmitting, touched, values, handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <ModalBody>
                  <ImageMapper
                    canEdit
                    label="Image Mapper"
                    errors={Boolean(errors.mapping && touched.mapping) && errors.mapping}
                    image={`${process.env.REACT_APP_BASE_URL}${baseData.image}`}
                    width={baseData.width}
                    height={baseData.height}
                    value={values.mapping.map(val => {
                      return {
                        ...val,
                        label: val.name
                      }
                    })}
                    onChange={(e) => {
                      const data = [...values.mapping]

                      if (data.length > 0) {
                        data.splice(0, 1, e)
                      } else {
                        data.push(e)
                      }

                      setFieldValue('mapping', data)
                    }}
                    onUpdate={(e) => {
                      const data = [...values.mapping]

                      if (data.length > 0) {
                        data.splice(0, 1, {
                          ...e,
                          type: dataModal.data.type
                        })
                      } else {
                        data.push(e)
                      }

                      setFieldValue('mapping', data)
                    }}
                    onDelete={((_, index) => {
                      const data = [...values.mapping]
                      data.splice(index, 1)
        
                      setFieldValue('mapping', data)
                    })}
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
      <Form onSubmit={handleSubmit}>
        <CardBody>
          <Row className="justify-content-center">
            <Col md={8}>
              <ImageMapper
                disabled
                label="Image Mapper"
                heightStyle={400}
                image={`${process.env.REACT_APP_BASE_URL}${baseData.image}`}
                width={baseData.width}
                height={baseData.height}
                value={values.detail.map(val => {
                  return {
                    ...val,
                    label: val.name
                  }
                })}
                onClick={(val, index) => {
                  setDataModal({
                    key: index,
                    data: val
                  })

                  toggleMapping()
                }}
              />
            </Col>
          </Row>

          <Label>Hasil Mapping</Label>
          <Table responsive>
            <thead>
              <tr className="text-center">
                <th style={{ minWidth: 10 }}>No</th>
                <th style={{ minWidth: 10 }}></th>
                <th style={{ minWidth: 200 }}>Nama</th>
                <th>Tipe</th>
                <th style={{ minWidth: 200 }}>Aksi</th>
                <th style={{ minWidth: 200 }}>Mapping</th>
                <th style={{ minWidth: 150 }}>Latitude/Longitude</th>
              </tr>
            </thead>

            <tbody>
              {values.detail.map((val, index) => (
                <tr key={`table-${index}`}>
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <ButtonGroup>
                      <DropdownButton
                        caret
                        size="sm"
                        id={index}
                        icon={Edit2}
                        item={[
                          {
                            label: "Ubah Aksi",
                            onClick: () => {
                              setDataModal({
                                key: index,
                                data: val
                              })
    
                              toggle()
                            }
                          },
                          {
                            label: "Ubah Mapping",
                            onClick: () => {
                              setDataModal({
                                key: index,
                                data: val
                              })
    
                              toggleMapping()
                            }
                          }
                        ]}
                      />
                      <DeleteButton
                        id={`hapus-${index}`}
                        onClick={() => {
                          const data = [...values.detail]
                          data.splice(index, 1)

                          setFieldValue('detail', data)
                        }}
                      />
                    </ButtonGroup>
                  </td>
                  <td>
                    <Field name={`detail[${index}].name`}>
                      {({ field, meta }) => (
                        <Fragment>
                          <div>{Boolean(field.value && field.value !== "") ? field.value : "-"}</div>
                          {Boolean(meta.touched && meta.error) && <small className="text-danger">{meta.error}</small>}
                        </Fragment>
                      )}
                    </Field>
                  </td>
                  <td>{val.type}</td>
                  <td>
                    <Field name={`detail[${index}].action`}>
                      {({ field, meta }) => (
                        <Fragment>
                          <div>{Boolean(field.value && field.value !== "") ? field.value : "-"}</div>
                          {Boolean(meta.touched && meta.error) && <small className="text-danger">{meta.error}</small>}
                        </Fragment>
                      )}
                    </Field>
                  </td>
                  <td>
                    <Field name={`detail[${index}].action_id`}>
                      {({ field, meta }) => (
                        <Fragment>
                          <div>{Boolean(field.value && field.value !== "") ? field.value : "-"}</div>
                          {Boolean(meta.touched && meta.error) && <small className="text-danger">{meta.error}</small>}
                        </Fragment>
                      )}
                    </Field>
                  </td>
                  <td>{val.latLng}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>

        <CardFooter>
          <ActionButton type="button" outline color="secondary" onClick={() => onBack(values)}>Back To Mapping</ActionButton>
          <ActionButton type="submit">Submit</ActionButton>
        </CardFooter>

        {show && (
          <DataModal
            toggle={toggle}
            onSubmit={values => {
              setFieldValue(`detail[${dataModal.key}]`, values)
              toggle()
            }}
          />
        )}

        {showMapping && (
          <DataModalMapping
            toggle={toggleMapping}
            onSubmit={values => {
              setFieldValue(`detail[${dataModal.key}]`, {
                ...dataModal.data,
                ...values
              })
              toggleMapping()
            }}
          />
        )}
      </Form>
    )
  }

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>Mapping Data</CardTitle>
        </CardHeader>

        <Formik
          initialValues={{ detail: data }}
          validationSchema={yup.object().shape({
            detail: yup.array().label("Koordinat").min(1).of(
              yup.object().shape({
                name: yup.string().label("Nama").required(),
                action: yup.string().label("Aksi").required(),
                action_id: yup.string().label("Mapping").required()
              })
            )
          })}
          onSubmit={(values, { setSubmitting }) => {
            DetailApi.store_detail(id, values).then(res => {
              toast('success', "Success", res.data.message)
              navigate('/master/mapping')
            }).catch(err => {
              toast('danger', "Error", err.response.data.message)
            }).finally(() => {
              setSubmitting(false)
            })
          }}
        >
          <FormSection baseData={baseData} id={id} onBack={onBack} />
        </Formik>
      </Card>
    </Fragment>
  )
}