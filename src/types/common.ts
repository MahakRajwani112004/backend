type ToolParameter = {
  type: string;
  properties: {
    [key: string]: {
      type: string;
      description: string;
    };
  };
  required: string[];
  oneOf?: { required: string[] }[];
};

type ToolFunction = {
  name: string;
  description: string;
  parameters: ToolParameter;
};

export type Tool = {
  type: "function";
  function: ToolFunction;
};
