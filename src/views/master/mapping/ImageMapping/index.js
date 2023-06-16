// React
import { useState } from "react"

// Components
import BreadCrumbs from "@core/components/breadcrumbs"
import { ActionSection, MappingSection } from "./components"

// View Components
import { BackButton, FetchingStatus } from "components"

// Third-Party Library
import { useParams, useNavigate } from "react-router-dom"
import useToggle from "@react-hook/toggle"

// API
import { useQuery } from "react-query"
import { DetailApi } from "../functions"

const ImageMapping = () => {
  // Variables
  const title = "Image Mapping"

  // Hooks
  const { id } = useParams()
  const navigate = useNavigate()

  const getData = useQuery(
    ['master', 'mapping', 'imageMapping', id],
    () => DetailApi.show(id)
  )

  const TabSection = ({ data, id }) => {
    // Hooks
    const [dataMapping, setDataMapping] = useState(data.images ?? [])
    const [isMappingPage, toggle] = useToggle(true, false)

    if (isMappingPage) {
      return (
        <MappingSection
          baseData={data}
          data={dataMapping}
          onSubmit={values => {
            const data = values.detail.map(val => {
              const isValid = dataMapping.find(item => val.latLng === item.latLng)
  
              if (isValid) {
                return isValid
              } else {
                return {
                  ...val,
                  name: "",
                  action: "",
                  action_id: ""
                }
              }
            })

            setDataMapping(data)
            toggle()
          }}
        />
      )
    } else {
      return (
        <ActionSection
          baseData={data}
          data={dataMapping}
          id={id}
          onBack={(values) => {
            setDataMapping(values.detail)
            toggle()
          }}
        />
      )
    }
  }

  return (
    <>
      <BreadCrumbs
        title={title}
        data={[{ title: 'Master' }, { title: 'Mapping' }, { title: 'Detail Mapping' }, { title }]}
        rightItem={(
          <BackButton onClick={() => navigate(-1)} />
        )}
      />

      {getData.isError || getData.isLoading ? (
        <FetchingStatus loading={getData.isLoading} />
      ) : (
        <TabSection data={getData.data} id={id} />
      )}
    </>
  )
}

export default ImageMapping