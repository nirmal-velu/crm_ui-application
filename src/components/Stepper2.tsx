import React, { useState, useEffect } from 'react';
import time from '../assets/waiting-period.svg'
import search from '../assets/quick-evaluation.svg'
import approved from '../assets/approval.svg'
import Stepper from './Stepper';

const Stepper2: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down' | null>(null);


  useEffect(() => {
    // Initialize the slider value
    setSliderValue(0);

    const slider = document.getElementById("myRange") as HTMLInputElement;

    const handleSliderInput = () => {
      const roundedValue = Math.round(parseInt(slider.value) / 10) * 10;
      if (roundedValue > sliderValue) {
        setTransitionDirection('up');
      } else if (roundedValue < sliderValue) {
        setTransitionDirection('down');
      } else {
        setTransitionDirection(null);
      }

      setSliderValue(roundedValue);

    };

    slider.addEventListener("input", handleSliderInput);

    // Cleanup the event listener on component unmount
    return () => {
      if (slider) {
        slider.removeEventListener("input", handleSliderInput);
      }
    };
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  // Use inline styles to set the background color with a transition
  const sliderStyle: React.CSSProperties = {
    background: `linear-gradient(to right, #E73493 ${sliderValue}%, #fff ${sliderValue}%)`,
    transition: 'background 0.2s',
    // marginTop: transitionDirection === 'up' ? '-5px' : (transitionDirection === 'down' ? '5px' : '0'),
  };
  const getAnimationClass = (direction: 'up' | 'down' | null) => {
    return direction ? `animate-${direction}` : '';
  };

  return (
    <>
      <div className='container-fluid background'>
        <Stepper />
        <h3 className='mt-4 mt-xxl-5 d-flex justify-content-center text-white policy-select-ckt'>Select your policy</h3>
        <form className="range-form mt-4">
          <div className="form-group row">
            <div className="col-md-12 ">
              <div className='d-flex justify-content-center ms-2'>
                <div className='slider-coverage ms-5'>
                  <label className='text-light coverage-amt'>Coverage Amount</label>
                  <span id="demo" className={`text-light price ${getAnimationClass('up')}`}>₹&nbsp;&nbsp;{sliderValue}</span>
                </div>
                <pre className='text-light lakh-txt'> Lakhs</pre>
              </div>
              <div className='slider-coverage-div focused'>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  className="range-slider"
                  id="myRange"
                  style={sliderStyle}
                />
              </div>
            </div>
            {/* <div className="col-md-3">
              <span id="demo">{sliderValue}</span>
            </div> */}
            <div className='mt-4 mt-xl-5'>
              <div className='plan'>
                <div className='plan1'>
                  <div className='select-plan'>
                    <input type='radio' className='radio mt-1' name='plan' defaultChecked />
                    <span className='plan-name'>Standard Plan</span>
                  </div>
                  <div className='plan-container'>
                    <div className='coverage'>Economical coverage for your family <span className='see-coverage'>See Coverage</span></div>
                    <div className='plan-spec'>
                      <div className='waiting-period'>
                        <img className='plan-spec-img' src={time} />
                        <p className='plan-spec-text'>Lesser waiting period</p>
                      </div>
                      <div className='quick-evaluation'>
                        <img className='plan-spec-img' src={search} />
                        <p className='plan-spec-text'> Simple health evaluation</p>
                      </div>
                      <div className='approval'>
                        <img className='plan-spec-img' src={approved} />
                        <p className='plan-spec-text'> Quick approval</p>
                      </div>
                    </div>
                    <div className='plan-amount'>₹1,143 <span className='time'><sub>/month</sub></span></div>
                  </div>
                </div>

                <div className='plan2'>
                  <div className='select-plan'>
                    <input type='radio' className='radio mt-1' name='plan' />
                    <span className='plan-name'>Elite Plan</span>
                  </div>
                  <div className='plan-container'>
                    <div className='coverage'>Zero spend coverage for your family <span className='see-coverage'>See Coverage</span></div>
                    <div className='plan-spec'>
                      <div className='waiting-period'>
                        <img className='plan-spec-img' src={time} />
                        <p className='plan-spec-text'>No waiting period</p>
                      </div>
                      <div className='quick-evaluation'>
                        <img className='plan-spec-img' src={search} />
                        <p className='plan-spec-text'>OP visits covered</p>
                      </div>
                      <div className='approval'>
                        <img className='plan-spec-img' src={approved} />
                        <p className='plan-spec-text'>Detailed health tests needed</p>
                      </div>
                    </div>
                    <div className='plan-amount'>₹1,555<span className='time'><sub>/month</sub></span></div>
                  </div>
                </div>
              </div>
              <div className='payment mt-3'>
                <div className='payment-container'>
                  <div className='plan-details'>
                    <div className='plan-amount'>₹1,143 <span className='time'><sub>/month</sub></span><span className='gst'>+ GST</span></div>
                    <div className='plan-amount'>₹13,070<span className='time'><sub>/year</sub></span><span className='gst'>+ GST</span></div>
                  </div>
                  <div className='proceed-container'>
                    <p className='view-details'>View Details</p>
                    <button className='proceed-button'> Proceed to pay</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Stepper2;
