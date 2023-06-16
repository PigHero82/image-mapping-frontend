// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Spinner, Label } from 'reactstrap'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss'

// Functions
import { fileName, toast } from 'functions'

// API
import { FileApi } from 'api'
import { useMutation } from 'react-query'

const FileUploaderSingle = ({
  accept, directory, label, errors, onChange, value
}) => {
  const destroyData = useMutation(value => FileApi.destroy(value))
  const handleRemoveFile = (value) => {
    destroyData.mutate({ file: value })
    onChange({
      height: '',
      width: '',
      dir: ''
    })
  }

  const storeData = useMutation(value => FileApi.store(value), {
    onSuccess: res => {
      const response = res.data

      toast('success', "Success", response.message)
      onChange(response.data)
    },
    onError: err => {
      toast('danger', "Error", err.response.data.message)
    }
  })

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept, // accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }
    noDragEventsBubbling: true,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (!storeData.isLoading) {
        if (rejectedFiles.length) {
          toast('danger', 'Error', "File format is not accepted")
        } else {
          const formData = new FormData()
          formData.append('dir', directory /* directory: "mapping" */)
          formData.append('file', acceptedFiles[0])

          storeData.mutate(formData)
        }
      }
    }
  })

  const fileChecker = (value, type) => {
    return type.some(item => value.includes(item))
  }

  const renderFilePreview = value => {
    if (fileChecker(value, ['.png', '.jpg', '.jpeg', '.gif'])) {
      return <img className='rounded' alt={fileName(value)} src={`${process.env.REACT_APP_BASE_URL}/${value}`} height='50' />
    } else {
      return <FileText size='28' />
    }
  }

  const FileList = () => {
    if (value && value !== "") {
      return (
        <ListGroup className='my-2'>
          <ListGroupItem className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
              <div className='file-preview me-1'>{renderFilePreview(value)}</div>
              <div>
                <p className='file-name mb-0'>{fileName(value)}</p>
              </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(value)}>
              <X size={14} />
            </Button>
          </ListGroupItem>
        </ListGroup>
      )
    } else {
      return null
    }
  }

  return (
    <>
      <Label className='form-label'>{label}</Label>

      <div>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className='d-flex align-items-center justify-content-center flex-column'>
            {storeData.isLoading ? (
              <>
                <Spinner color='secondary' size='xl' className='mb-1' />
                <h5>Please wait...</h5>
              </>
            ) : (
              <>
                <DownloadCloud size={64} />
                <h5>Drop Files here or click to upload</h5>
              </>
            )}
          </div>
        </div>
        {errors ? <small className='text-danger'>{errors.message}</small> : <></>}

        <FileList />
      </div>
    </>
  )
}

export default FileUploaderSingle