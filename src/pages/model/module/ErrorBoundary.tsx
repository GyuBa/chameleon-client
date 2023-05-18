import React from "react";
import {FiAlertTriangle} from "react-icons/fi";

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: any) {
        return {hasError: true};
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error(error, errorInfo);
    }

    componentDidUpdate(prevProps: ErrorBoundaryProps) {
        if (prevProps.children !== this.props.children) {
            this.setState({hasError: false});
        }
    }

    render() {
        const {hasError} = this.state;
        const {children} = this.props;

        if (hasError) {
            return (
                <div className="flex items-center">
                    <FiAlertTriangle size="50" color="#484848" className="pl-1"/>
                    <span
                        className="text-gray-700 flex justify-between w-full px-1 py-2 text-xl leading-5 text-left">Wrong JSONForm</span>
                </div>
            );
        }

        return children;
    }
}