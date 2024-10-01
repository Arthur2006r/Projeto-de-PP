package br.com.ohara.model;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ListaManga {
	private Long idListaManga;

	@NotNull
	private Long idUsuario;

	@NotNull
	private Long idManga;
}
