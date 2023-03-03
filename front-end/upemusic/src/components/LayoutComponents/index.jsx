import './styles.css'

export const LayoutComponent = (props) => {
    return (
        <div className="container">
            <div className="container-form">
                <div className="wrap-form">
                    {props.children}
                </div>
            </div>
        </div>

    )
}