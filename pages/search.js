import { Col, Form, Row, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store'; 

export default function AdvancedSearch() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            searchBy: 'title', 
            geoLocation: "", 
            medium: "", 
            isOnView: false, 
            isHighLight: false,
            q: "",
        },
    });
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    function submitForm(data) {
        let queryString = `${data.searchBy}=true`;
        if (data.geoLocation) {
            queryString += `&geoLocation=${data.geoLocation}`;
        }
        if (data.medium) {
            queryString += `&medium=${data.medium}`;
        }
        queryString += `&isOnView=${data.isOnView}`;
        queryString += `&isHighLight=${data.isHighLight}`;
        queryString += `&q=${data.q}`;
        router.push(`/artwork?${queryString}`);
        setSearchHistory(current => [...current, queryString]);
    }

    return (
        <>
            <Form onSubmit={handleSubmit(submitForm)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Search Query</Form.Label>
                            <Form.Control type="text" placeholder="" {...register("q", { required: true })} className={errors.q ? 'is-invalid' : ''} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Search By</Form.Label>
                            <Form.Select {...register("searchBy")} className="mb-3">
                                <option value="title">Title</option>
                                <option value="tags">Tags</option>
                                <option value="artistOrCulture">Artist or Culture</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" placeholder="" {...register("geoLocation")} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (e.g., "Europe", "France", "Paris", "China", "New York"), with multiple values separated by the '|' operator.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" placeholder="" {...register("medium")} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (e.g., "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles"), with multiple values separated by the '|' operator.
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            {...register("isHighLight")}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Currently on View"
                            {...register("isOnView")}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col><br />
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form> 
        </>
    );
}
