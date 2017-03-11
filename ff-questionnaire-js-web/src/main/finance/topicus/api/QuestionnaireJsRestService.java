package finance.topicus.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import nl.finan.services.Services;
import nl.topicus.services.QuestionnaireJsService;

/**
 * REST API for Questionnaire JS.
 * 
 * REST service URL: http://hostname:port/ff-questionnaire-js-web/rest/QuestionnaireJsRestService
 * Example: http://hostname:port/ff-questionnaire-js-web/rest/QuestionnaireJsRestService/api/get/modeltypes
 */
@Path("/QuestionnaireJsRestService")
public class QuestionnaireJsRestService
{
	@GET
	@Path("/api/get/modeltypes")
	@Produces("application/json;charset=utf-8")
	public Response getModelTypes()
	{
		Response serverResponse;
		try
		{
			String jsonResult = Services.get(QuestionnaireJsService.class).getModelTypesJSON();
			serverResponse = Response.ok(jsonResult).build();
		}
		catch (Exception e)
		{
			serverResponse = Response.serverError().status(Status.BAD_REQUEST).build();
		}
		return serverResponse;
	}

	@GET
	@Path("/api/get/model/{modelType}")
	@Produces("application/json;charset=utf-8")
	public Response getModelForType(@PathParam("modelType") String modelType)
	{
		Response serverResponse;
		try
		{
			String jsonResult = Services.get(QuestionnaireJsService.class).getModelForTypeJSON(modelType);
			serverResponse = Response.ok(jsonResult).build();
		}
		catch (Exception e)
		{
			serverResponse = Response.serverError().status(Status.BAD_REQUEST).build();
		}
		return serverResponse;
	}

	@GET
	@Path("/api/get/result/{questionnaireData}")
	@Produces("application/json;charset=utf-8")
	public Response getQuestionnaireResult(@PathParam("questionnaireData") String questionnaireData)
	{
		Response serverResponse;
		try
		{
			String jsonResult = Services.get(QuestionnaireJsService.class).getQuestionnaireResultJSON(questionnaireData);
			serverResponse = Response.ok(jsonResult).build();
		}
		catch (Exception e)
		{
			serverResponse = Response.serverError().status(Status.BAD_REQUEST).build();
		}
		return serverResponse;
	}
}
