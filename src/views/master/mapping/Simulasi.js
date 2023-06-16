// React
import { Fragment, useEffect, useState } from "react"

// Components
import BreadCrumbs from "@core/components/breadcrumbs"
import { Card, CardBody, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader } from "reactstrap"
import { BackButton, DataStatus, FetchingStatus, ImageMapper, Select } from "components"

// API
import { useMutation, useQuery } from "react-query"
import { Api, DetailApi } from "./functions"

// Third-Party Library
import { useNavigate, useParams } from "react-router-dom"
import useToggle from "@react-hook/toggle"

const Simulasi = () => {
  // Variables
  const title = "Simulasi"

  // Hooks
  const { id } = useParams()
  const navigate = useNavigate()

  // API
  const fetchData = useQuery(
    ['master', 'mapping', 'simulasi', id],
    () => Api.show(id)
  )

  const ImageSection = ({ data }) => {
    // Hooks
    const [show, toggle] = useToggle(false, true)
    const [selectedMap, setSelectedMap] = useState(data.details.find(val => val.is_default === 1)?.id ?? data.details[0].id)
    const [dataModal, setDataModal] = useState({})

    // Variables
    const dataDropdown = data.details.map(val => {
      return {
        ...val,
        value: val.id,
        label: val.name
      }
    })
    const selectedData = dataDropdown.find(val => val.value === selectedMap)

    // API
    const getImageMapping = useMutation(val => DetailApi.show(val))

    useEffect(() => {
      getImageMapping.mutate(selectedMap)
    }, [selectedMap])

    const ProductSection = ({ data, toggle }) => {
      // Variables
      const product = data.product

      return (
        <Modal isOpen={true} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            Produk
          </ModalHeader>

          <ModalBody>
            <img
              src={`${process.env.REACT_APP_BASE_URL}${product.image}`}
              alt={product.name}
              className="img-thumbnail"
            />

            <ListGroup>
              <ListGroupItem>
                <div>ID</div>
                <div className="fw-bold">{product.id}</div>
              </ListGroupItem>

              <ListGroupItem>
                <div>Nama</div>
                <div className="fw-bold">{product.name}</div>
              </ListGroupItem>

              <ListGroupItem>
                <div>Harga</div>
                <div className="fw-bold">{`Rp. ${parseFloat(product.price ?? 0).toLocaleString('id-ID')}`}</div>
              </ListGroupItem>
            </ListGroup>
          </ModalBody>
        </Modal>
      )
    }

    return (
      <CardBody>
        <Select
          label="Data Mapping"
          placeholder="Pilih Mapping..."
          options={dataDropdown}
          value={selectedData}
          onChange={e => setSelectedMap(e.value)}
        />

        {getImageMapping.isLoading || getImageMapping.isError ? (
          <FetchingStatus loading={getImageMapping.isLoading} />
        ) : (
          <ImageMapper
            disabled
            label="Image Mapper"
            heightStyle={700}
            image={`${process.env.REACT_APP_BASE_URL}${selectedData.image}`}
            width={selectedData.width}
            height={selectedData.height}
            value={getImageMapping.data?.images.map(val => {
              return {
                ...val,
                label: val.name
              }
            })}
            onClick={(val) => {
              if (val.action === 2) {
                setSelectedMap(val.action_id)
              } else if (val.action === 1) {
                setDataModal(val)
                toggle()
              }

              return false
            }}
          />
        )}

        {show && <ProductSection data={dataModal} toggle={toggle} />}
      </CardBody>
    )
  }

  return (
    <Fragment>
      <BreadCrumbs
        title={title}
        data={[{ title: 'Master' }, { title: "Mapping" }, { title }]}
        rightItem={(
          <BackButton onClick={() => navigate(-1)} />
        )}
      />

      <Card>
        {fetchData.isLoading || fetchData.isError ? (
          <FetchingStatus loading={fetchData.isLoading} />
        ) : fetchData.data.length === 0 ? (
          <DataStatus>Data mapping tidak tersedia</DataStatus>
        ) : (
          <ImageSection data={fetchData.data} />
        )}
      </Card>
    </Fragment>
  )
}

export default Simulasi