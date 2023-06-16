// React
import { useRef } from "react"

// Third-Party Library
import useToggle from "@react-hook/toggle"

// Components
import { ActionButton } from "components/buttons"
import { ButtonGroup } from "reactstrap"

// Functions
import { toast } from "functions"

// Leaflet
import L, { CRS } from "leaflet"
import { FeatureGroup, ImageOverlay, MapContainer, Polygon, Rectangle } from "react-leaflet"
import { EditControl } from "react-leaflet-draw"
import "leaflet-draw/dist/leaflet.draw.css"
import Marker from "react-leaflet-enhanced-marker"

// Icons
import { Check, Trash } from "react-feather"

const ImageMapper = ({
  canEdit = false,
  disabled = false,
  label = "",
  image = "",
  width = 0,
  height = 0,
  heightStyle = 700,
  value = [],
  errors,
  onChange,
  onClick,
  onDelete,
  onUpdate
}) => {
  // Hooks
  const mapRef = useRef(null)
  const [isDeleteMap, toggleDeleteMap] = useToggle(false, true)
  const [isShow, toggleShow] = useToggle(false, true)
  
  // States
  const bounds = [
    [0, width],
    [height, 0]
  ]

  const dataEmpty = () => {
    toast("info", "Information", "Data is already empty")
  }

  const handleRender = () => {
    toggleShow()

    setTimeout(toggleShow, 300)
  }

  const Vector = ({
    layer,
    latLng,
    value,
    ...props
  }) => {
    // Variables
    const Type = layer === "rectangle" ? Rectangle : Polygon
    const center = L.polygon(latLng).getBounds().getCenter()

    const View = () => {
      const markerStyle = {
        color: "white",
        display: "flex",
        justifyContent: "center",
        height: "50px",
        borderRadius: "50px",
        alignItems: "center"
      }

      return <div style={markerStyle}>{value.label}</div>
    }

    return (
      <Type {...props} positions={latLng} bounds={latLng}>
        <Marker position={center} icon={<View />} />
      </Type>
    )
  }

  return (
    <div className="mb-1">
      <div className="d-flex justify-content-between mb-50 align-items-end">
        <h4>{label ?? "Mapping Data"}</h4>

        {!disabled && (
          <ButtonGroup>
            <ActionButton
              color={isDeleteMap ? "outline-success" : "danger"}
              onClick={() => {
                if (!isDeleteMap && value.length === 0) {
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
        )}
      </div>

      {errors ? <small className='text-danger'>{errors}</small> : <></>}

      {isShow ? (
        <div style={{ height: '700px', zIndex: '1' }} />
      ) : (
        <MapContainer
          className="map"
          crs={CRS.Simple}
          bounds={bounds}
          minZoom={0}
          maxZoom={3}
          style={{ height: heightStyle }}
          maxBoundsViscosity={1.0}
          whenReady={mapInstance => {
            mapRef.current = mapInstance.target
          }}
          maxBounds={bounds}
        >
          <ImageOverlay url={image} bounds={bounds}>
            <FeatureGroup>
              {!disabled && (
                <EditControl
                  position="topright"
                  onCreated={e => {
                    // Variables
                    const { layerType, layer } = e

                    if (layerType === "polygon" || layerType === "rectangle") {
                      onChange({
                        type: layerType,
                        latLng: JSON.stringify(layer.getLatLngs()[0].map(val => {
                          return [val.lat, val.lng]
                        }))
                      })

                      handleRender()
                    }

                    mapRef.current.removeLayer(layer)
                  }}
                  onEdited={event => {
                    // Variables
                    const layer = event.layers._layers

                    Object.keys(layer).forEach(function(key) {
                      onUpdate({
                        latLng: JSON.stringify(layer[key].getLatLngs()[0].map(val => {
                          return [val.lat, val.lng]
                        }))
                      })
                    })
                  }}
                  draw={{
                    polyline: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                    drawLayer: false
                  }}
                  edit={{
                    edit: canEdit,
                    remove: false
                  }}
                />
              )}

              {value.map((val, index) => {
                const latLng = JSON.parse(val.latLng)
  
                return (
                  <Vector
                    key={index}
                    pathOptions={{ color: isDeleteMap ? "red" : "blue" }}
                    latLng={latLng}
                    value={val}
                    layer={val.type}
                    eventHandlers={{
                      click: () => {
                        if (isDeleteMap) {
                          onDelete(val, index)
                          handleRender()
                        } else {
                          if (onClick) {
                            onClick(val, index)
                          }
                        }
                      }
                    }}
                  />
                )
              })}
            </FeatureGroup>
          </ImageOverlay>
        </MapContainer>
      )}
    </div>
  )
}

export default ImageMapper