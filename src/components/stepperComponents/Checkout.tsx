import React, { useState, useEffect, useContext } from 'react';
import time from '../../assets/waiting-period.svg';
import search from '../../assets/quick-evaluation.svg';
import approved from '../../assets/approval.svg';
import Stepper from './Stepper';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const Stepper2: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const state = useContext(UserContext)
  // const [transitionDirection, setTransitionDirection] = useState<'up' | 'down' | null>(null);
  const navigate = useNavigate()

  const standard: number = 1143;
  const standardplan = standard.toLocaleString();
  const elite: number = 1555;
  const eliteplan = elite.toLocaleString();
  const yearlystandard: number = standard * 12;
  const yearlystandardplan = yearlystandard.toLocaleString();
  const yearlyelite: number = elite * 12;
  const yearlyeliteplan = yearlyelite.toLocaleString();
  const [selectedplan, setSelectedplan] = useState("standard");

  const handleplan = (e: any) => {
    console.log(selectedplan)
    setSelectedplan(e.target.value);
  }

  useEffect(() => {
    setSliderValue(0);

    const slider = document.getElementById("myRange") as HTMLInputElement;

    const handleSliderInput = () => {
      const roundedValue = Math.round(parseInt(slider.value) / 10) * 10;
      setSliderValue(roundedValue);

    };

    slider.addEventListener("input", handleSliderInput);

    return () => {
      if (slider) {
        slider.removeEventListener("input", handleSliderInput);
      }
    };
  }, []);


  const sliderStyle: React.CSSProperties = {
    background: `linear-gradient(to right, #E73493 ${sliderValue}%, #fff ${sliderValue}%)`,
    transition: 'background 0.2s',
  };

  const handleClick = (e: any) => {
    state.setS2state('true');
    state.setColorStep(1);
    navigate('/healthinfo');
  };
  return (
    <>
      <div className='container-fluid background-div'>
        <Stepper />
        <h3 className='pt-4 d-flex justify-content-center text-white policy-select-ckt mt-xxl-4'>Select your policy</h3>
        <form className="range-form mt-4">
          <div className="form-group row">
            <div className="col-md-12 ">
              <div className='d-flex justify-content-center ms-2'>
                <div className='slider-coverage ms-5'>
                  <label className='text-light coverage-amt'>Coverage Amount</label>
                  <span id="demo" className={`text-light price`}>₹&nbsp;&nbsp;{sliderValue}</span>
                </div>
                <pre className='text-light lakh-txt'> Lakhs</pre>
              </div>
              <div className='slider-coverage-div focused mt-xxl-2'>
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
            <div className='mt-4'>
              <div className='plan'>
                <div className='plan1 mt-xxl-4'>
                  <div className='select-plan'>
                    <input type='radio' className='radio mt-1' name='plan' defaultChecked onChange={handleplan} value='standard' />
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
                    <div className='plan-amount'>₹{standardplan}<span className='time'><sub>/month</sub></span></div>
                  </div>
                </div>

                <div className='plan2  mt-xxl-4'>
                  <div className='select-plan'>
                    <input type='radio' className='radio mt-1' name='plan' onChange={handleplan} value='elite' />
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
                    <div className='plan-amount'>₹{eliteplan}<span className='time'><sub>/month</sub></span></div>
                  </div>
                </div>
              </div>
              <div className='payment mt-3  pt-xxl-3'>
                <div className='payment-container'>
                  <div className='plan-details'>
                    <div className='plan-amount'>{selectedplan === 'standard' ? `₹${standardplan}` : `₹${eliteplan}`}<span className='time'><sub>/month</sub></span><span className='gst'>+ GST</span></div>
                    <div className='plan-amount'>{selectedplan === 'standard' ? `₹${yearlystandardplan}` : `₹${yearlyeliteplan}`}<span className='time'><sub>/year</sub></span><span className='gst'>+ GST</span></div>
                  </div>
                  <div className='proceed-container'>
                    <p className='view-details'>View Details</p>
                    <button className='proceed-button' onClick={(e) => handleClick(e)}> Proceed to pay</button>
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
