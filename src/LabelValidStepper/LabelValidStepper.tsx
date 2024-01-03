import React, { useState, createContext, ReactNode } from 'react';

interface SenderInfo {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface LabelInfo {
  sender: SenderInfo;
  recevier: SenderInfo;
  weight: string;
  shippingOption: string;
}

interface LabelContextProps {
  page: number;
  steps: { title: string }[];
  nextPage: () => void;
  prevPage: () => void;
  labelInfo: LabelInfo;
  handleChange: (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSenderInfo: (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  setRecevierInfo: (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LabelContext = createContext<LabelContextProps | undefined>(undefined);

interface LabelValidStepperProps {
  children: ReactNode;
}

const LabelValidStepper: React.FC<LabelValidStepperProps> = (props) => {
  const [page, setPage] = useState<number>(0);
  const [labelInfo, setLabelInfo] = useState<LabelInfo>({
    sender: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    recevier: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    weight: "",
    shippingOption: "1"
  });

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabelInfo({ ...labelInfo, [prop]: event.target.value });
  };

  const setSenderInfo = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabelInfo({
      ...labelInfo,
      sender: { ...labelInfo.sender, [prop]: event.target.value }
    });
  };

  const setRecevierInfo = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabelInfo({
      ...labelInfo,
      recevier: { ...labelInfo.recevier, [prop]: event.target.value }
    });
  };

  const steps = [
    { title: "Get Sender address" },
    { title: "Get Receiver address" },
    { title: "Get Weight" },
    { title: "Get Shipping Option" },
    { title: "Confirm" }
  ];

  return (
    <LabelContext.Provider
      value={{
        page,
        steps,
        nextPage,
        prevPage,
        labelInfo,
        handleChange,
        setSenderInfo,
        setRecevierInfo
      }}
    >
      {props.children}
    </LabelContext.Provider>
  );
};

export default LabelValidStepper;
