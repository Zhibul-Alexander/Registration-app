import React from "react";

export class ErrorBoundary extends React.Component {
    state ={
        isError: false
    }
    static getDerivedStateFromError(error){
        return ({isError: true})
    }
    render() {
        if(this.state.isError){
            return <div>Что-то пошло не так.</div>
        }
        return this.props.children;
    }
}
