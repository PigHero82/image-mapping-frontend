// React
import { useState, useRef, useEffect } from "react"

// Components
import {
  Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row, Col, ButtonGroup
} from "reactstrap"

// Leaflet
import { CRS } from "leaflet"
import { EditControl } from "react-leaflet-draw"
import { ImageOverlay, MapContainer, FeatureGroup, Polygon } from "react-leaflet"
import "leaflet-draw/dist/leaflet.draw.css"

// View Components
import { ActionButton, Input } from "components"

// Functions
import { toast } from "functions"

// Third-Party Library
import useToggle from "@react-hook/toggle"

// Icons
import { Check, RotateCcw, Trash } from "react-feather"

const Home = () => {
  // Variables
  const bounds = [
    [-3500, -3500],
    [2000, 6000]
  ]

  // Hooks
  const mapRef = useRef()
  const [isLoadingMap, toggleLoadingMap] = useToggle(false, true)
  const [isDeleteMap, toggleDeleteMap] = useToggle(false, true)

  // States
  const [mapLayers, setMapLayers] = useState([
    {
      type: "rectangle",
      latlng: [
        {
          lat: "-1211.064187481712",
          lng: "554.4887383573241"
        },
        {
          lat: "515.786662410555",
          lng: "554.4887383573241"
        },
        {
          lat: "515.786662410555",
          lng: "3627.633259949196"
        },
        {
          lat: "-1211.064187481712",
          lng: "3627.633259949196"
        }
      ]
    }
  ])

  useEffect(() => {
    toggleLoadingMap()

    setTimeout(() => {
      toggleLoadingMap()
    }, 300)
  }, [mapLayers])

  const dataEmpty = () => {
    toast("info", "Information", "Data is already empty")
  }

  return (
    <div>
      <Card>
        <CardBody>
          <Row>
            <Col md={8}>
              <div className="d-flex justify-content-between mb-50 align-items-end">
                <h4>Mapping Data</h4>

                <ButtonGroup>
                  <ActionButton
                    color="primary"
                    onClick={() => {
                      const data = [...mapLayers]
                      data.pop()

                      if (mapLayers.length === 0) {
                        dataEmpty()
                      } else {
                        setMapLayers(data)
                      }
                    }}
                    size='sm'
                  >
                    <RotateCcw size={14} />
                  </ActionButton>

                  <ActionButton
                    color={isDeleteMap ? "outline-success" : "danger"}
                    onClick={() => {
                      if (!isDeleteMap && mapLayers.length === 0) {
                        dataEmpty()
                      } else {
                        toggleDeleteMap()
                      }
                    }}
                    size='sm'
                  >
                    {isDeleteMap ? <Check size={14} /> : <Trash size={14} />}
                  </ActionButton>
                </ButtonGroup>
              </div>

              {isLoadingMap ? (
                <div style={{ height: '60vh', zIndex: '1' }} />
              ) : (
                <MapContainer
                  className="map"
                  crs={CRS.Simple}
                  bounds={bounds}
                  zoom={0}
                  minZoom={-4}
                  maxZoom={1}
                  style={{ height: '60vh', zIndex: '1' }}
                  scrollWheelZoom={false}
                  whenReady={mapInstance => {
                    mapRef.current = mapInstance.target
                  }}
                >
                  <ImageOverlay url="https://i.imgur.com/Ion6X7C.jpg" bounds={bounds}>
                    <FeatureGroup>
                      <EditControl
                        position="topright"
                        onCreated={e => {
                          const { layerType, layer } = e

                          if (layerType === "polygon" || layerType === "rectangle") {
                            const data = [...mapLayers]
                            data.push({
                              type: layerType,
                              latlng: layer.getLatLngs()[0]
                            })
                            setMapLayers(data)
                          }

                          mapRef.current.removeLayer(layer)
                        }}
                        draw={{
                          polyline: false,
                          circle: false,
                          circlemarker: false,
                          marker: false,
                          drawLayer: false
                        }}
                        edit={{
                          edit: false,
                          remove: false
                        }}
                      />
                    </FeatureGroup>

                    {mapLayers.map((val, index) => (
                      <Polygon
                        key={index}
                        pathOptions={{
                          fillColor: isDeleteMap ? "red" : "blue",
                          color: isDeleteMap ? "red" : "blue"
                        }}
                        positions={val.latlng}
                        eventHandlers={{
                          click: () => {
                            if (isDeleteMap) {
                              setMapLayers(mapLayers.filter((_data, key) => key !== index))
                            }
                          }
                        }}
                      />
                    ))}
                  </ImageOverlay>
                </MapContainer>
              )}
            </Col>

            <Col>
              {mapLayers.map((val, index) => <Input key={index} label={`Input-${index}`} value={val.type} />)}
            </Col>
          </Row>

          <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kick start your project 🚀</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>All the best for your new project.</CardText>
          <CardText>
            Please make sure to read our{" "}
            <CardLink
              href="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/"
              target="_blank"
            >
              Template Documentation
            </CardLink>{" "}
            to understand where to go from here and how to use our template.
          </CardText>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Want to integrate JWT? 🔒</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            We carefully crafted JWT flow so you can implement JWT with ease and
            with minimum efforts.
          </CardText>
          <CardText>
            Please read our{" "}
            <CardLink
              href="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/docs/development/auth"
              target="_blank"
            >
              JWT Documentation
            </CardLink>{" "}
            to get more out of JWT authentication.
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
