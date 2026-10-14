declare module "redux-persist/integration/react" {
    import * as React from "react";

    export interface PersistGateProps {
        children?: React.ReactNode;
        loading?: React.ReactNode;
        persistor: any;
    }

    export class PersistGate extends React.Component<PersistGateProps> { }
}