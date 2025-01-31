import { Star, X } from 'lucide-react'
import './RatingModal.scss'
import { useEffect, useRef, useState } from 'react'

interface RatingModalProps {
  existingRating: CourseReview | null
  onClose: () => void
  onSubmit: (rating: number, feedback: string) => void
  onDelete: () => void
}

const RatingModal: React.FC<RatingModalProps> = ({ existingRating, onClose, onSubmit, onDelete }) => {
  const [step, setStep] = useState(1)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [mode, setMode] = useState<'view' | 'edit'>('view')

  useEffect(() => {
    if (existingRating) {
      setRating(existingRating.rating)
      setFeedback(existingRating.reviewText)
      setMode('view')
    } else {
      setMode('edit')
    }
  }, [existingRating])
  const handleClose = () => {
    onClose()
    // Reset state when closing
    // setTimeout(() => {
    //   setStep(1)
    //   setMode(existingRating ? 'view' : 'edit')
    //   setHoveredRating(0)
    //   setRating(existingRating?.rating || 0)
    //   setFeedback(existingRating?.reviewText || '')
    // }, 200)
  }

  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating)
    // onSelectRating(selectedRating)
    setStep(2)
  }

  const handleSubmit = () => {
    onSubmit(rating, feedback)
    handleClose()
  }
  const modalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getRatingLabel = (rating: number) => {
    if (rating === 5) return 'Tuyệt vời, trên cả mong đợi!'
    if (rating === 4) return 'Rất tốt'
    if (rating === 3) return 'Tốt'
    if (rating === 2) return 'Trung bình'
    return 'Kém'
  }

  if (mode === 'view' && existingRating) {
    return (
      <div className='modal-overlay'>
        <div className='modal rating-modal' ref={modalRef}>
          <div className='rating-modal-top-btn'>
            <button className='rating-modal-close' onClick={handleClose}>
              <X size={24} />
            </button>
          </div>
          <h2>Đánh giá của bạn</h2>

          <div className='rating-display view-mode'>
            <div className='stars-display'>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={32} className={`star-icon ${star <= rating ? 'filled' : ''}`} />
              ))}
            </div>
          </div>

          <p className='feedback-text'>{feedback || 'Không có ai viết bình luận cho đánh giá của bạn.'}</p>

          <div className='rating-modal-actions'>
            <button
              className='delete-button'
              onClick={() => {
                // Handle delete rating
                onDelete()
                handleClose()
              }}
            >
              Xóa
            </button>
            <button
              className='edit-button'
              onClick={() => {
                setMode('edit')
                setStep(2)
              }}
            >
              Chỉnh sửa đánh giá
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='modal-overlay'>
      <div className='modal rating-modal' ref={modalRef}>
        <div className='rating-modal-top-btn'>
          <button className='rating-modal-close' onClick={handleClose}>
            <X size={24} />
          </button>
          {step === 2 && !existingRating && (
            <button className='back-button' onClick={() => setStep(1)}>
              Quay lại
            </button>
          )}
        </div>

        {step === 1 ? (
          <div>
            <h2>Bạn sẽ xếp hạng khóa học này ở mức nào?</h2>
            <div className='rating-subtext'>Chọn xếp hạng</div>
            <div className='stars-container'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className='star-button'
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => handleRatingSelect(star)}
                >
                  <Star size={48} className={`star-icon ${star <= (hoveredRating || rating) ? 'filled' : ''}`} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Step 2: Feedback
          <div>
            <h2>Vì sao bạn xếp hạng ở mức này?</h2>
            <div className='rating-display'>
              <div className='rating-label'>{getRatingLabel(rating)}</div>
              <div className='stars-display'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className='star-button'
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      key={star}
                      size={32}
                      className={`star-icon ${star <= (hoveredRating || rating) ? 'filled' : ''}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              className='feedback-input'
              placeholder='Hãy cho chúng tôi biết trải nghiệm cá nhân của riêng bạn khi tham gia khóa học này. Khóa học có phù hợp với bạn không?'
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button className='submit-button' onClick={handleSubmit}>
              Lưu và tiếp tục
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RatingModal
