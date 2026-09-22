import { useCallback, useRef, useState } from 'react'
import Button from './Button'

const ACCEPT = 'image/jpeg,image/jpg,image/png'

export default function ImageUploader({ file, previewUrl, onFileChange, onClear }) {
  const inputRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = useCallback(
    (files) => {
      const selected = files?.[0]
      if (!selected) return
      const valid = ['image/jpeg', 'image/jpg', 'image/png'].includes(selected.type)
      if (!valid) {
        alert('Please upload JPG, JPEG, or PNG only.')
        return
      }
      onFileChange(selected)
    },
    [onFileChange],
  )

  return (
    <div>
      {!previewUrl ? (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragOver(false)
            handleFiles(e.dataTransfer.files)
          }}
          onClick={() => inputRef.current?.click()}
          className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-center transition-colors ${
            dragOver ? 'border-teal-500 bg-teal-50' : 'border-slate-300 bg-slate-50 hover:border-teal-400'
          }`}
        >
          <span className="text-3xl" aria-hidden>
            📷
          </span>
          <p className="mt-3 font-medium text-slate-700">Drag and drop your image here</p>
          <p className="mt-1 text-sm text-slate-500">or use the button below</p>
          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            onClick={(e) => {
              e.stopPropagation()
              inputRef.current?.click()
            }}
          >
            Choose File
          </Button>
          <p className="mt-4 text-xs text-slate-500">Supported: JPG, PNG, JPEG</p>
          <p className="text-xs text-slate-500">MRI, CT, X-Ray (demo upload only)</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
            <img src={previewUrl} alt="Medical scan preview" className="max-h-64 w-full object-contain" />
          </div>
          <p className="truncate text-sm text-slate-600">{file?.name}</p>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
              Change Image
            </Button>
            <Button type="button" variant="ghost" onClick={onClear}>
              Remove
            </Button>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
