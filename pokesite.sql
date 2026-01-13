-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 13 jan. 2026 à 14:24
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pokesite`
--

-- --------------------------------------------------------

--
-- Structure de la table `acceder`
--

CREATE TABLE `acceder` (
  `num_pokedex` int(11) NOT NULL,
  `id_meca` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `applique`
--

CREATE TABLE `applique` (
  `id_talent` int(11) NOT NULL,
  `id_statut` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `attaques`
--

CREATE TABLE `attaques` (
  `id_attaque` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `precision_` int(11) NOT NULL,
  `puissance` int(11) NOT NULL,
  `pp` int(11) NOT NULL,
  `categorie` varchar(50) NOT NULL,
  `id_type` int(11) NOT NULL,
  `generation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `avoir`
--

CREATE TABLE `avoir` (
  `num_pokedex` int(11) NOT NULL,
  `id_attaque` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `donne`
--

CREATE TABLE `donne` (
  `id_objet` int(11) NOT NULL,
  `id_statut` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `détenir`
--

CREATE TABLE `détenir` (
  `num_pokedex` int(11) NOT NULL,
  `id_talent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inflige`
--

CREATE TABLE `inflige` (
  `id_attaque` int(11) NOT NULL,
  `id_statut` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `mecanique`
--

CREATE TABLE `mecanique` (
  `id_meca` int(11) NOT NULL,
  `nom_meca` varchar(50) NOT NULL,
  `id_objet` int(11) NOT NULL,
  `generation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `objet`
--

CREATE TABLE `objet` (
  `id_objet` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL,
  `img` varchar(50) NOT NULL,
  `generation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pokemon`
--

CREATE TABLE `pokemon` (
  `num_pokedex` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `img` varchar(50) NOT NULL,
  `img_shiny` varchar(50) NOT NULL,
  `img_mini` varchar(50) NOT NULL,
  `generation` int(11) NOT NULL,
  `hp` int(11) NOT NULL,
  `attaque` int(11) NOT NULL,
  `defense` int(11) NOT NULL,
  `attaque_spe` int(11) NOT NULL,
  `defense_spe` int(11) NOT NULL,
  `vitesse` int(11) NOT NULL,
  `taux_capture` int(11) DEFAULT NULL,
  `rarete` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pokemon`
--

INSERT INTO `pokemon` (`num_pokedex`, `nom`, `img`, `img_shiny`, `img_mini`, `generation`, `hp`, `attaque`, `defense`, `attaque_spe`, `defense_spe`, `vitesse`, `taux_capture`, `rarete`) VALUES
(1, 'Bulbizarre', '/img/bulbizarre.png', '/img/bulbizarre_shiny.png', '/img/bulbizarre_mini.png', 1, 45, 49, 49, 65, 65, 45, 45, 'Starter'),
(2, 'Herbizarre', '/img/herbizarre.png', '/img/herbizarre_shiny.png', '/img/herbizarre_mini.png', 1, 60, 62, 63, 80, 80, 60, 45, 'Starter'),
(3, 'Florizarre', '/img/florizarre.png', '/img/florizarre_shiny.png', '/img/florizarre_mini.png', 1, 80, 82, 83, 100, 100, 80, 45, 'Starter'),
(4, 'Salamèche', '/img/salameche.png', '/img/salameche_shiny.png', '/img/salameche_mini.png', 1, 39, 52, 43, 60, 50, 65, 45, 'Starter'),
(5, 'Reptincel', '/img/reptincel.png', '/img/reptincel_shiny.png', '/img/reptincel_mini.png', 1, 58, 64, 58, 80, 65, 80, 45, 'Starter'),
(6, 'Dracaufeu', '/img/dracaufeu.png', '/img/dracaufeu_shiny.png', '/img/dracaufeu_mini.png', 1, 78, 84, 78, 109, 85, 100, 45, 'Starter'),
(7, 'Carapuce', '/img/carapuce.png', '/img/carapuce_shiny.png', '/img/carapuce_mini.png', 1, 44, 48, 65, 50, 64, 43, 45, 'Starter'),
(8, 'Carabaffe', '/img/carabaffe.png', '/img/carabaffe_shiny.png', '/img/carabaffe_mini.png', 1, 59, 63, 80, 65, 80, 58, 45, 'Starter'),
(9, 'Tortank', '/img/tortank.png', '/img/tortank_shiny.png', '/img/tortank_mini.png', 1, 79, 83, 100, 85, 105, 78, 45, 'Starter'),
(10, 'Chenipan', '/img/chenipan.png', '/img/chenipan_shiny.png', '/img/chenipan_mini.png', 1, 45, 30, 35, 20, 20, 45, 255, ''),
(11, 'Chrysacier', '/img/chrysacier.png', '/img/chrysacier_shiny.png', '/img/chrysacier_mini.png', 1, 50, 20, 55, 25, 25, 30, 120, ''),
(12, 'Papilusion', '/img/papilusion.png', '/img/papilusion_shiny.png', '/img/papilusion_mini.png', 1, 60, 45, 50, 90, 80, 70, 45, ''),
(13, 'Aspicot', '/img/aspicot.png', '/img/aspicot_shiny.png', '/img/aspicot_mini.png', 1, 40, 35, 30, 20, 20, 50, 255, ''),
(14, 'Coconfort', '/img/coconfort.png', '/img/coconfort_shiny.png', '/img/coconfort_mini.png', 1, 45, 25, 50, 25, 25, 35, 120, ''),
(15, 'Dardargnan', '/img/dardargnan.png', '/img/dardargnan_shiny.png', '/img/dardargnan_mini.png', 1, 65, 90, 40, 45, 80, 75, 45, ''),
(16, 'Roucool', '/img/roucool.png', '/img/roucool_shiny.png', '/img/roucool_mini.png', 1, 40, 45, 40, 35, 35, 56, 255, ''),
(17, 'Roucoups', '/img/roucoups.png', '/img/roucoups_shiny.png', '/img/roucoups_mini.png', 1, 63, 60, 55, 50, 50, 71, 120, ''),
(18, 'Roucarnage', '/img/roucarnage.png', '/img/roucarnage_shiny.png', '/img/roucarnage_mini.png', 1, 83, 80, 75, 70, 70, 101, 45, ''),
(19, 'Rattata', '/img/rattata.png', '/img/rattata_shiny.png', '/img/rattata_mini.png', 1, 30, 56, 35, 25, 35, 72, 255, ''),
(20, 'Rattatac', '/img/rattatac.png', '/img/rattatac_shiny.png', '/img/rattatac_mini.png', 1, 55, 81, 60, 50, 70, 97, 127, ''),
(21, 'Piafabec', '/img/piafabec.png', '/img/piafabec_shiny.png', '/img/piafabec_mini.png', 1, 40, 60, 30, 31, 31, 70, 255, ''),
(22, 'Rapasdepic', '/img/rapasdepic.png', '/img/rapasdepic_shiny.png', '/img/rapasdepic_mini.png', 1, 65, 90, 65, 61, 61, 100, 90, ''),
(23, 'Abo', '/img/abo.png', '/img/abo_shiny.png', '/img/abo_mini.png', 1, 35, 60, 44, 40, 54, 55, 255, ''),
(24, 'Arbok', '/img/arbok.png', '/img/arbok_shiny.png', '/img/arbok_mini.png', 1, 60, 95, 69, 65, 79, 80, 90, ''),
(25, 'Pikachu', '/img/pikachu.png', '/img/pikachu_shiny.png', '/img/pikachu_mini.png', 1, 35, 55, 40, 50, 50, 90, 190, ''),
(26, 'Raichu', '/img/raichu.png', '/img/raichu_shiny.png', '/img/raichu_mini.png', 1, 60, 90, 55, 90, 80, 110, 75, ''),
(27, 'Sabelette', '/img/sabelette.png', '/img/sabelette_shiny.png', '/img/sabelette_mini.png', 1, 50, 75, 85, 20, 30, 40, 255, ''),
(28, 'Sablaireau', '/img/sablaireau.png', '/img/sablaireau_shiny.png', '/img/sablaireau_mini.png', 1, 75, 100, 110, 45, 55, 65, 90, ''),
(29, 'Nidoran♀', '/img/nidoranf.png', '/img/nidoranf_shiny.png', '/img/nidoranf_mini.png', 1, 55, 47, 52, 40, 40, 41, 235, ''),
(30, 'Nidorina', '/img/nidorina.png', '/img/nidorina_shiny.png', '/img/nidorina_mini.png', 1, 70, 62, 67, 55, 55, 56, 120, ''),
(31, 'Nidoqueen', '/img/nidoqueen.png', '/img/nidoqueen_shiny.png', '/img/nidoqueen_mini.png', 1, 90, 92, 87, 75, 85, 76, 45, ''),
(32, 'Nidoran♂', '/img/nidoranm.png', '/img/nidoranm_shiny.png', '/img/nidoranm_mini.png', 1, 46, 57, 40, 40, 40, 50, 235, ''),
(33, 'Nidorino', '/img/nidorino.png', '/img/nidorino_shiny.png', '/img/nidorino_mini.png', 1, 61, 72, 57, 55, 55, 65, 120, ''),
(34, 'Nidoking', '/img/nidoking.png', '/img/nidoking_shiny.png', '/img/nidoking_mini.png', 1, 81, 102, 77, 85, 75, 85, 45, ''),
(35, 'Mélofée', '/img/melofee.png', '/img/melofee_shiny.png', '/img/melofee_mini.png', 1, 70, 45, 48, 60, 65, 35, 150, ''),
(36, 'Mélodelfe', '/img/melodelfe.png', '/img/melodelfe_shiny.png', '/img/melodelfe_mini.png', 1, 95, 70, 73, 95, 90, 60, 25, ''),
(37, 'Goupix', '/img/goupix.png', '/img/goupix_shiny.png', '/img/goupix_mini.png', 1, 38, 41, 40, 50, 65, 65, 190, ''),
(38, 'Feunard', '/img/feunard.png', '/img/feunard_shiny.png', '/img/feunard_mini.png', 1, 73, 76, 75, 81, 100, 100, 75, ''),
(39, 'Rondoudou', '/img/rondoudou.png', '/img/rondoudou_shiny.png', '/img/rondoudou_mini.png', 1, 115, 45, 20, 45, 25, 20, 170, ''),
(40, 'Grodoudou', '/img/grodoudou.png', '/img/grodoudou_shiny.png', '/img/grodoudou_mini.png', 1, 140, 70, 45, 85, 50, 45, 50, ''),
(41, 'Nosferapti', '/img/nosferapti.png', '/img/nosferapti_shiny.png', '/img/nosferapti_mini.png', 1, 40, 45, 35, 30, 40, 55, 255, ''),
(42, 'Nosferalto', '/img/nosferalto.png', '/img/nosferalto_shiny.png', '/img/nosferalto_mini.png', 1, 75, 80, 70, 65, 75, 90, 90, ''),
(43, 'Mystherbe', '/img/mystherbe.png', '/img/mystherbe_shiny.png', '/img/mystherbe_mini.png', 1, 45, 50, 55, 75, 65, 30, 255, ''),
(44, 'Ortide', '/img/ortide.png', '/img/ortide_shiny.png', '/img/ortide_mini.png', 1, 60, 65, 70, 85, 75, 40, 120, ''),
(45, 'Rafflesia', '/img/rafflesia.png', '/img/rafflesia_shiny.png', '/img/rafflesia_mini.png', 1, 75, 80, 85, 110, 90, 50, 45, ''),
(46, 'Paras', '/img/paras.png', '/img/paras_shiny.png', '/img/paras_mini.png', 1, 35, 70, 55, 45, 55, 25, 190, ''),
(47, 'Parasect', '/img/parasect.png', '/img/parasect_shiny.png', '/img/parasect_mini.png', 1, 60, 95, 80, 60, 80, 30, 75, ''),
(48, 'Mimitoss', '/img/mimitoss.png', '/img/mimitoss_shiny.png', '/img/mimitoss_mini.png', 1, 60, 55, 50, 40, 55, 45, 190, ''),
(49, 'Aéromite', '/img/aeromite.png', '/img/aeromite_shiny.png', '/img/aeromite_mini.png', 1, 70, 65, 60, 90, 75, 90, 75, ''),
(50, 'Taupiqueur', '/img/taupiqueur.png', '/img/taupiqueur_shiny.png', '/img/taupiqueur_mini.png', 1, 10, 55, 25, 35, 45, 95, 255, ''),
(51, 'Triopikeur', '/img/triopikeur.png', '/img/triopikeur_shiny.png', '/img/triopikeur_mini.png', 1, 35, 100, 50, 50, 70, 120, 50, ''),
(52, 'Miaouss', '/img/miaouss.png', '/img/miaouss_shiny.png', '/img/miaouss_mini.png', 1, 40, 45, 35, 40, 40, 90, 255, ''),
(53, 'Persian', '/img/persian.png', '/img/persian_shiny.png', '/img/persian_mini.png', 1, 65, 70, 60, 65, 65, 115, 90, ''),
(54, 'Psykokwak', '/img/psykokwak.png', '/img/psykokwak_shiny.png', '/img/psykokwak_mini.png', 1, 50, 52, 48, 65, 50, 55, 190, ''),
(55, 'Akwakwak', '/img/akwakwak.png', '/img/akwakwak_shiny.png', '/img/akwakwak_mini.png', 1, 80, 82, 78, 95, 80, 85, 75, ''),
(56, 'Férosinge', '/img/ferosinge.png', '/img/ferosinge_shiny.png', '/img/ferosinge_mini.png', 1, 40, 80, 35, 35, 45, 70, 190, ''),
(57, 'Colossinge', '/img/colossinge.png', '/img/colossinge_shiny.png', '/img/colossinge_mini.png', 1, 65, 105, 60, 60, 70, 95, 75, ''),
(58, 'Caninos', '/img/caninos.png', '/img/caninos_shiny.png', '/img/caninos_mini.png', 1, 55, 70, 45, 70, 50, 60, 190, ''),
(59, 'Arcanin', '/img/arcanin.png', '/img/arcanin_shiny.png', '/img/arcanin_mini.png', 1, 90, 110, 80, 100, 80, 95, 75, ''),
(60, 'Ptitard', '/img/ptitard.png', '/img/ptitard_shiny.png', '/img/ptitard_mini.png', 1, 40, 50, 40, 40, 40, 90, 255, ''),
(61, 'Têtarte', '/img/tetarte.png', '/img/tetarte_shiny.png', '/img/tetarte_mini.png', 1, 65, 65, 65, 50, 50, 90, 120, ''),
(62, 'Tartard', '/img/tartard.png', '/img/tartard_shiny.png', '/img/tartard_mini.png', 1, 90, 95, 95, 70, 90, 70, 45, ''),
(63, 'Abra', '/img/abra.png', '/img/abra_shiny.png', '/img/abra_mini.png', 1, 25, 20, 15, 105, 55, 90, 200, ''),
(64, 'Kadabra', '/img/kadabra.png', '/img/kadabra_shiny.png', '/img/kadabra_mini.png', 1, 40, 35, 30, 120, 70, 105, 100, ''),
(65, 'Alakazam', '/img/alakazam.png', '/img/alakazam_shiny.png', '/img/alakazam_mini.png', 1, 55, 50, 45, 135, 95, 120, 50, ''),
(66, 'Machoc', '/img/machoc.png', '/img/machoc_shiny.png', '/img/machoc_mini.png', 1, 70, 80, 50, 35, 35, 35, 180, ''),
(67, 'Machopeur', '/img/machopeur.png', '/img/machopeur_shiny.png', '/img/machopeur_mini.png', 1, 80, 100, 70, 50, 60, 45, 90, ''),
(68, 'Mackogneur', '/img/mackogneur.png', '/img/mackogneur_shiny.png', '/img/mackogneur_mini.png', 1, 90, 130, 80, 65, 85, 55, 45, ''),
(69, 'Chétiflor', '/img/chetiflor.png', '/img/chetiflor_shiny.png', '/img/chetiflor_mini.png', 1, 50, 75, 35, 70, 30, 40, 255, ''),
(70, 'Boustiflor', '/img/boustiflor.png', '/img/boustiflor_shiny.png', '/img/boustiflor_mini.png', 1, 65, 90, 50, 85, 45, 55, 120, ''),
(71, 'Empiflor', '/img/empiflor.png', '/img/empiflor_shiny.png', '/img/empiflor_mini.png', 1, 80, 105, 65, 100, 70, 70, 45, ''),
(72, 'Tentacool', '/img/tentacool.png', '/img/tentacool_shiny.png', '/img/tentacool_mini.png', 1, 40, 40, 35, 50, 100, 70, 190, ''),
(73, 'Tentacruel', '/img/tentacruel.png', '/img/tentacruel_shiny.png', '/img/tentacruel_mini.png', 1, 80, 70, 65, 80, 120, 100, 60, ''),
(74, 'Racaillou', '/img/racaillou.png', '/img/racaillou_shiny.png', '/img/racaillou_mini.png', 1, 40, 80, 100, 30, 30, 20, 255, ''),
(75, 'Gravalanch', '/img/gravalanch.png', '/img/gravalanch_shiny.png', '/img/gravalanch_mini.png', 1, 55, 95, 115, 45, 45, 35, 120, ''),
(76, 'Grolem', '/img/grolem.png', '/img/grolem_shiny.png', '/img/grolem_mini.png', 1, 80, 120, 130, 55, 65, 45, 45, ''),
(77, 'Ponyta', '/img/ponyta.png', '/img/ponyta_shiny.png', '/img/ponyta_mini.png', 1, 50, 85, 55, 65, 65, 90, 190, ''),
(78, 'Galopa', '/img/galopa.png', '/img/galopa_shiny.png', '/img/galopa_mini.png', 1, 65, 100, 70, 80, 80, 105, 60, ''),
(79, 'Ramoloss', '/img/ramoloss.png', '/img/ramoloss_shiny.png', '/img/ramoloss_mini.png', 1, 90, 65, 65, 40, 40, 15, 190, ''),
(80, 'Flagadoss', '/img/flagadoss.png', '/img/flagadoss_shiny.png', '/img/flagadoss_mini.png', 1, 95, 75, 110, 100, 80, 30, 75, ''),
(81, 'Magnéti', '/img/magneti.png', '/img/magneti_shiny.png', '/img/magneti_mini.png', 1, 25, 35, 70, 95, 55, 45, 190, ''),
(82, 'Magnéton', '/img/magneton.png', '/img/magneton_shiny.png', '/img/magneton_mini.png', 1, 50, 60, 95, 120, 70, 70, 60, ''),
(83, 'Canarticho', '/img/canarticho.png', '/img/canarticho_shiny.png', '/img/canarticho_mini.png', 1, 52, 90, 55, 58, 62, 60, 45, ''),
(84, 'Doduo', '/img/doduo.png', '/img/doduo_shiny.png', '/img/doduo_mini.png', 1, 35, 85, 45, 35, 35, 75, 190, ''),
(85, 'Dodrio', '/img/dodrio.png', '/img/dodrio_shiny.png', '/img/dodrio_mini.png', 1, 60, 110, 70, 60, 60, 110, 45, ''),
(86, 'Otaria', '/img/otaria.png', '/img/otaria_shiny.png', '/img/otaria_mini.png', 1, 65, 45, 55, 45, 70, 45, 190, ''),
(87, 'Lamantine', '/img/lamantine.png', '/img/lamantine_shiny.png', '/img/lamantine_mini.png', 1, 90, 70, 80, 70, 95, 70, 75, ''),
(88, 'Tadmorv', '/img/tadmorv.png', '/img/tadmorv_shiny.png', '/img/tadmorv_mini.png', 1, 80, 80, 50, 40, 50, 25, 190, ''),
(89, 'Grotadmorv', '/img/grotadmorv.png', '/img/grotadmorv_shiny.png', '/img/grotadmorv_mini.png', 1, 105, 105, 75, 65, 100, 50, 75, ''),
(90, 'Kokiyas', '/img/kokiyas.png', '/img/kokiyas_shiny.png', '/img/kokiyas_mini.png', 1, 30, 65, 100, 45, 25, 40, 190, ''),
(91, 'Crustabri', '/img/crustabri.png', '/img/crustabri_shiny.png', '/img/crustabri_mini.png', 1, 50, 95, 180, 85, 45, 70, 60, ''),
(92, 'Fantominus', '/img/fantominus.png', '/img/fantominus_shiny.png', '/img/fantominus_mini.png', 1, 30, 35, 30, 100, 35, 80, 190, ''),
(93, 'Spectrum', '/img/spectrum.png', '/img/spectrum_shiny.png', '/img/spectrum_mini.png', 1, 45, 50, 45, 115, 55, 95, 90, ''),
(94, 'Ectoplasma', '/img/ectoplasma.png', '/img/ectoplasma_shiny.png', '/img/ectoplasma_mini.png', 1, 60, 65, 60, 130, 75, 110, 45, ''),
(95, 'Onix', '/img/onix.png', '/img/onix_shiny.png', '/img/onix_mini.png', 1, 35, 45, 160, 30, 45, 70, 45, ''),
(96, 'Soporifik', '/img/soporifik.png', '/img/soporifik_shiny.png', '/img/soporifik_mini.png', 1, 60, 48, 45, 43, 90, 42, 190, ''),
(97, 'Hypnomade', '/img/hypnomade.png', '/img/hypnomade_shiny.png', '/img/hypnomade_mini.png', 1, 85, 73, 70, 73, 115, 67, 75, ''),
(98, 'Krabby', '/img/krabby.png', '/img/krabby_shiny.png', '/img/krabby_mini.png', 1, 30, 105, 90, 25, 25, 50, 225, ''),
(99, 'Krabboss', '/img/krabboss.png', '/img/krabboss_shiny.png', '/img/krabboss_mini.png', 1, 55, 130, 115, 50, 50, 75, 60, ''),
(100, 'Voltorbe', '/img/voltorbe.png', '/img/voltorbe_shiny.png', '/img/voltorbe_mini.png', 1, 40, 30, 50, 55, 55, 100, 190, ''),
(101, 'Électrode', '/img/electrode.png', '/img/electrode_shiny.png', '/img/electrode_mini.png', 1, 60, 50, 70, 80, 80, 150, 60, ''),
(102, 'Noeunoeuf', '/img/noeunoeuf.png', '/img/noeunoeuf_shiny.png', '/img/noeunoeuf_mini.png', 1, 60, 40, 80, 60, 45, 40, 90, ''),
(103, 'Noadkoko', '/img/noadkoko.png', '/img/noadkoko_shiny.png', '/img/noadkoko_mini.png', 1, 95, 95, 85, 125, 75, 55, 45, ''),
(104, 'Osselait', '/img/osselait.png', '/img/osselait_shiny.png', '/img/osselait_mini.png', 1, 50, 50, 95, 40, 50, 35, 190, ''),
(105, 'Ossatueur', '/img/ossatueur.png', '/img/ossatueur_shiny.png', '/img/ossatueur_mini.png', 1, 60, 80, 110, 50, 80, 45, 75, ''),
(106, 'Kicklee', '/img/kicklee.png', '/img/kicklee_shiny.png', '/img/kicklee_mini.png', 1, 50, 120, 53, 35, 110, 87, 45, ''),
(107, 'Tygnon', '/img/tygnon.png', '/img/tygnon_shiny.png', '/img/tygnon_mini.png', 1, 50, 105, 79, 35, 110, 76, 45, ''),
(108, 'Excelangue', '/img/excelangue.png', '/img/excelangue_shiny.png', '/img/excelangue_mini.png', 1, 90, 55, 75, 60, 75, 30, 45, ''),
(109, 'Smogo', '/img/smogo.png', '/img/smogo_shiny.png', '/img/smogo_mini.png', 1, 40, 65, 95, 60, 45, 35, 190, ''),
(110, 'Smogogo', '/img/smogogo.png', '/img/smogogo_shiny.png', '/img/smogogo_mini.png', 1, 65, 90, 120, 85, 70, 60, 60, ''),
(111, 'Rhinocorne', '/img/rhinocorne.png', '/img/rhinocorne_shiny.png', '/img/rhinocorne_mini.png', 1, 80, 85, 95, 30, 30, 25, 120, ''),
(112, 'Rhinoféros', '/img/rhinoferos.png', '/img/rhinoferos_shiny.png', '/img/rhinoferos_mini.png', 1, 105, 130, 120, 45, 45, 40, 60, ''),
(113, 'Leveinard', '/img/leveinard.png', '/img/leveinard_shiny.png', '/img/leveinard_mini.png', 1, 250, 5, 5, 35, 105, 50, 30, ''),
(114, 'Saquedeneu', '/img/saquedeneu.png', '/img/saquedeneu_shiny.png', '/img/saquedeneu_mini.png', 1, 65, 55, 115, 100, 40, 60, 45, ''),
(115, 'Kangourex', '/img/kangourex.png', '/img/kangourex_shiny.png', '/img/kangourex_mini.png', 1, 105, 95, 80, 40, 80, 90, 45, ''),
(116, 'Hypotrempe', '/img/hypotrempe.png', '/img/hypotrempe_shiny.png', '/img/hypotrempe_mini.png', 1, 30, 40, 70, 70, 25, 60, 225, ''),
(117, 'Hypocéan', '/img/hypocean.png', '/img/hypocean_shiny.png', '/img/hypocean_mini.png', 1, 55, 65, 95, 95, 45, 85, 75, ''),
(118, 'Poissirène', '/img/poissirene.png', '/img/poissirene_shiny.png', '/img/poissirene_mini.png', 1, 45, 67, 60, 35, 50, 63, 225, ''),
(119, 'Poissoroy', '/img/poissoroy.png', '/img/poissoroy_shiny.png', '/img/poissoroy_mini.png', 1, 80, 92, 65, 65, 80, 68, 60, ''),
(120, 'Stari', '/img/stari.png', '/img/stari_shiny.png', '/img/stari_mini.png', 1, 30, 45, 55, 70, 55, 85, 225, ''),
(121, 'Staross', '/img/staross.png', '/img/staross_shiny.png', '/img/staross_mini.png', 1, 60, 75, 85, 100, 85, 115, 60, ''),
(122, 'M. Mime', '/img/m-mime.png', '/img/m-mime_shiny.png', '/img/m-mime_mini.png', 1, 40, 45, 65, 100, 120, 90, 45, ''),
(123, 'Insécateur', '/img/insecateur.png', '/img/insecateur_shiny.png', '/img/insecateur_mini.png', 1, 70, 110, 80, 55, 80, 105, 45, ''),
(124, 'Lippoutou', '/img/lippoutou.png', '/img/lippoutou_shiny.png', '/img/lippoutou_mini.png', 1, 65, 50, 35, 115, 95, 95, 45, ''),
(125, 'Élektek', '/img/elektek.png', '/img/elektek_shiny.png', '/img/elektek_mini.png', 1, 65, 83, 57, 95, 85, 105, 45, ''),
(126, 'Magmar', '/img/magmar.png', '/img/magmar_shiny.png', '/img/magmar_mini.png', 1, 65, 95, 57, 100, 85, 93, 45, ''),
(127, 'Scarabrute', '/img/scarabrute.png', '/img/scarabrute_shiny.png', '/img/scarabrute_mini.png', 1, 65, 125, 100, 55, 70, 85, 45, ''),
(128, 'Tauros', '/img/tauros.png', '/img/tauros_shiny.png', '/img/tauros_mini.png', 1, 75, 100, 95, 40, 70, 110, 45, ''),
(129, 'Magicarpe', '/img/magicarpe.png', '/img/magicarpe_shiny.png', '/img/magicarpe_mini.png', 1, 20, 10, 55, 15, 20, 80, 255, ''),
(130, 'Leviator', '/img/leviator.png', '/img/leviator_shiny.png', '/img/leviator_mini.png', 1, 95, 125, 79, 60, 100, 81, 45, ''),
(131, 'Lokhlass', '/img/lokhlass.png', '/img/lokhlass_shiny.png', '/img/lokhlass_mini.png', 1, 130, 85, 80, 85, 95, 60, 45, ''),
(132, 'Métamorph', '/img/metamorph.png', '/img/metamorph_shiny.png', '/img/metamorph_mini.png', 1, 48, 48, 48, 48, 48, 48, 35, ''),
(133, 'Évoli', '/img/evoli.png', '/img/evoli_shiny.png', '/img/evoli_mini.png', 1, 55, 55, 50, 45, 65, 55, 45, ''),
(134, 'Aquali', '/img/aquali.png', '/img/aquali_shiny.png', '/img/aquali_mini.png', 1, 130, 65, 60, 110, 95, 65, 45, ''),
(135, 'Voltali', '/img/voltali.png', '/img/voltali_shiny.png', '/img/voltali_mini.png', 1, 65, 65, 60, 110, 95, 130, 45, ''),
(136, 'Pyroli', '/img/pyroli.png', '/img/pyroli_shiny.png', '/img/pyroli_mini.png', 1, 65, 130, 60, 95, 110, 65, 45, ''),
(137, 'Porygon', '/img/porygon.png', '/img/porygon_shiny.png', '/img/porygon_mini.png', 1, 65, 60, 70, 85, 75, 40, 45, ''),
(138, 'Amonita', '/img/amonita.png', '/img/amonita_shiny.png', '/img/amonita_mini.png', 1, 35, 40, 100, 90, 55, 35, 45, 'Fossile'),
(139, 'Amonistar', '/img/amonistar.png', '/img/amonistar_shiny.png', '/img/amonistar_mini.png', 1, 70, 60, 125, 115, 70, 55, 45, 'Fossile'),
(140, 'Kabuto', '/img/kabuto.png', '/img/kabuto_shiny.png', '/img/kabuto_mini.png', 1, 30, 80, 90, 55, 45, 55, 45, 'Fossile'),
(141, 'Kabutops', '/img/kabutops.png', '/img/kabutops_shiny.png', '/img/kabutops_mini.png', 1, 60, 115, 105, 65, 70, 80, 45, 'Fossile'),
(142, 'Ptéra', '/img/ptera.png', '/img/ptera_shiny.png', '/img/ptera_mini.png', 1, 80, 105, 65, 60, 75, 130, 45, 'Fossile'),
(143, 'Ronflex', '/img/ronflex.png', '/img/ronflex_shiny.png', '/img/ronflex_mini.png', 1, 160, 110, 65, 65, 110, 30, 25, ''),
(144, 'Artikodin', '/img/artikodin.png', '/img/artikodin_shiny.png', '/img/artikodin_mini.png', 1, 90, 85, 100, 95, 125, 85, 3, 'Légendaire'),
(145, 'Électhor', '/img/electhor.png', '/img/electhor_shiny.png', '/img/electhor_mini.png', 1, 90, 90, 85, 125, 90, 100, 3, 'Légendaire'),
(146, 'Sulfura', '/img/sulfura.png', '/img/sulfura_shiny.png', '/img/sulfura_mini.png', 1, 90, 100, 90, 125, 85, 90, 3, 'Légendaire'),
(147, 'Minidraco', '/img/minidraco.png', '/img/minidraco_shiny.png', '/img/minidraco_mini.png', 1, 41, 64, 45, 50, 50, 50, 45, 'Surpuissant'),
(148, 'Draco', '/img/draco.png', '/img/draco_shiny.png', '/img/draco_mini.png', 1, 61, 84, 65, 70, 70, 70, 45, 'Surpuissant'),
(149, 'Dracolosse', '/img/dracolosse.png', '/img/dracolosse_shiny.png', '/img/dracolosse_mini.png', 1, 91, 134, 95, 100, 100, 80, 45, 'Surpuissant'),
(150, 'Mewtwo', '/img/mewtwo.png', '/img/mewtwo_shiny.png', '/img/mewtwo_mini.png', 1, 106, 110, 90, 154, 90, 130, 3, 'Légendaire'),
(151, 'Mew', '/img/mew.png', '/img/mew_shiny.png', '/img/mew_mini.png', 1, 100, 100, 100, 100, 100, 100, 45, 'Fabuleux'),
(152, 'Germignon', '/img/germignon.png', '/img/germignon_shiny.png', '/img/germignon_mini.png', 2, 45, 49, 65, 49, 65, 45, 45, 'Starter'),
(153, 'Macronium', '/img/macronium.png', '/img/macronium_shiny.png', '/img/macronium_mini.png', 2, 60, 62, 80, 63, 80, 60, 45, 'Starter'),
(154, 'Méganium', '/img/meganium.png', '/img/meganium_shiny.png', '/img/meganium_mini.png', 2, 80, 82, 100, 83, 100, 80, 45, 'Starter'),
(155, 'Héricendre', '/img/hericendre.png', '/img/hericendre_shiny.png', '/img/hericendre_mini.png', 2, 39, 52, 43, 60, 50, 65, 45, 'Starter'),
(156, 'Feurisson', '/img/feurisson.png', '/img/feurisson_shiny.png', '/img/feurisson_mini.png', 2, 58, 64, 58, 80, 65, 80, 45, 'Starter'),
(157, 'Typhlosion', '/img/typhlosion.png', '/img/typhlosion_shiny.png', '/img/typhlosion_mini.png', 2, 78, 84, 78, 109, 85, 100, 45, 'Starter'),
(158, 'Kaiminus', '/img/kaiminus.png', '/img/kaiminus_shiny.png', '/img/kaiminus_mini.png', 2, 50, 65, 64, 44, 48, 43, 45, 'Starter'),
(159, 'Crocrodil', '/img/crocrodil.png', '/img/crocrodil_shiny.png', '/img/crocrodil_mini.png', 2, 65, 80, 80, 59, 63, 58, 45, 'Starter'),
(160, 'Aligatueur', '/img/aligatueur.png', '/img/aligatueur_shiny.png', '/img/aligatueur_mini.png', 2, 85, 105, 100, 79, 83, 78, 45, 'Starter'),
(161, 'Fouinette', '/img/fouinette.png', '/img/fouinette_shiny.png', '/img/fouinette_mini.png', 2, 35, 46, 34, 35, 45, 20, 255, NULL),
(162, 'Fouinar', '/img/fouinar.png', '/img/fouinar_shiny.png', '/img/fouinar_mini.png', 2, 85, 76, 64, 45, 55, 90, 90, NULL),
(163, 'Hoothoot', '/img/hoothoot.png', '/img/hoothoot_shiny.png', '/img/hoothoot_mini.png', 2, 60, 30, 30, 36, 56, 50, 255, NULL),
(164, 'Noarfang', '/img/noarfang.png', '/img/noarfang_shiny.png', '/img/noarfang_mini.png', 2, 100, 50, 50, 86, 96, 70, 90, NULL),
(165, 'Coxy', '/img/coxy.png', '/img/coxy_shiny.png', '/img/coxy_mini.png', 2, 40, 20, 30, 40, 80, 55, 255, NULL),
(166, 'Coxyclaque', '/img/coxyclaque.png', '/img/coxyclaque_shiny.png', '/img/coxyclaque_mini.png', 2, 55, 35, 50, 55, 110, 85, 90, NULL),
(167, 'Mimigal', '/img/mimigal.png', '/img/mimigal_shiny.png', '/img/mimigal_mini.png', 2, 40, 60, 40, 40, 40, 30, 255, NULL),
(168, 'Migalos', '/img/migalos.png', '/img/migalos_shiny.png', '/img/migalos_mini.png', 2, 70, 90, 70, 60, 70, 40, 90, NULL),
(169, 'Nostenfer', '/img/nostenfer.png', '/img/nostenfer_shiny.png', '/img/nostenfer_mini.png', 2, 85, 90, 80, 70, 80, 130, 90, NULL),
(170, 'Loupio', '/img/loupio.png', '/img/loupio_shiny.png', '/img/loupio_mini.png', 2, 75, 38, 38, 56, 56, 67, 190, NULL),
(171, 'Lanturn', '/img/lanturn.png', '/img/lanturn_shiny.png', '/img/lanturn_mini.png', 2, 125, 58, 58, 76, 76, 67, 75, NULL),
(172, 'Pichu', '/img/pichu.png', '/img/pichu_shiny.png', '/img/pichu_mini.png', 2, 20, 40, 15, 35, 35, 60, 190, NULL),
(173, 'Mélo', '/img/melo.png', '/img/melo_shiny.png', '/img/melo_mini.png', 2, 50, 25, 28, 45, 55, 15, 150, NULL),
(174, 'Toudoudou', '/img/toudoudou.png', '/img/toudoudou_shiny.png', '/img/toudoudou_mini.png', 2, 90, 30, 15, 40, 20, 15, 170, NULL),
(175, 'Togepi', '/img/togepi.png', '/img/togepi_shiny.png', '/img/togepi_mini.png', 2, 35, 20, 65, 40, 65, 20, 190, NULL),
(176, 'Togetic', '/img/togetic.png', '/img/togetic_shiny.png', '/img/togetic_mini.png', 2, 55, 40, 85, 80, 105, 40, 75, NULL),
(177, 'Natu', '/img/natu.png', '/img/natu_shiny.png', '/img/natu_mini.png', 2, 40, 50, 45, 70, 45, 70, 190, NULL),
(178, 'Xatu', '/img/xatu.png', '/img/xatu_shiny.png', '/img/xatu_mini.png', 2, 65, 75, 70, 95, 70, 95, 75, NULL),
(179, 'Wattouat', '/img/wattouat.png', '/img/wattouat_shiny.png', '/img/wattouat_mini.png', 2, 55, 40, 40, 65, 45, 35, 235, NULL),
(180, 'Lainergie', '/img/lainergie.png', '/img/lainergie_shiny.png', '/img/lainergie_mini.png', 2, 70, 55, 55, 80, 60, 45, 120, NULL),
(181, 'Pharamp', '/img/pharamp.png', '/img/pharamp_shiny.png', '/img/pharamp_mini.png', 2, 90, 75, 85, 115, 90, 55, 45, NULL),
(182, 'Joliflor', '/img/joliflor.png', '/img/joliflor_shiny.png', '/img/joliflor_mini.png', 2, 75, 80, 95, 90, 100, 50, 45, NULL),
(183, 'Marill', '/img/marill.png', '/img/marill_shiny.png', '/img/marill_mini.png', 2, 70, 20, 50, 20, 50, 40, 190, NULL),
(184, 'Azumarill', '/img/azumarill.png', '/img/azumarill_shiny.png', '/img/azumarill_mini.png', 2, 100, 50, 80, 60, 80, 50, 75, NULL),
(185, 'Simularbre', '/img/simularbre.png', '/img/simularbre_shiny.png', '/img/simularbre_mini.png', 2, 70, 100, 115, 30, 65, 30, 65, NULL),
(186, 'Tarpaud', '/img/tarpaud.png', '/img/tarpaud_shiny.png', '/img/tarpaud_mini.png', 2, 90, 75, 75, 90, 100, 70, 45, NULL),
(187, 'Granivol', '/img/granivol.png', '/img/granivol_shiny.png', '/img/granivol_mini.png', 2, 35, 35, 40, 35, 55, 50, 255, NULL),
(188, 'Floravol', '/img/floravol.png', '/img/floravol_shiny.png', '/img/floravol_mini.png', 2, 55, 45, 50, 45, 65, 80, 120, NULL),
(189, 'Cotovol', '/img/cotovol.png', '/img/cotovol_shiny.png', '/img/cotovol_mini.png', 2, 75, 55, 70, 55, 95, 110, 45, NULL),
(190, 'Capumain', '/img/capumain.png', '/img/capumain_shiny.png', '/img/capumain_mini.png', 2, 55, 70, 55, 40, 55, 85, 45, NULL),
(191, 'Tournegrin', '/img/tournegrin.png', '/img/tournegrin_shiny.png', '/img/tournegrin_mini.png', 2, 30, 30, 30, 30, 30, 30, 235, NULL),
(192, 'Héliatronc', '/img/heliatronc.png', '/img/heliatronc_shiny.png', '/img/heliatronc_mini.png', 2, 75, 75, 55, 105, 85, 30, 120, NULL),
(193, 'Yanma', '/img/yanma.png', '/img/yanma_shiny.png', '/img/yanma_mini.png', 2, 65, 65, 45, 75, 45, 95, 75, NULL),
(194, 'Axoloto', '/img/axoloto.png', '/img/axoloto_shiny.png', '/img/axoloto_mini.png', 2, 55, 45, 45, 25, 25, 15, 255, NULL),
(195, 'Maraiste', '/img/maraiste.png', '/img/maraiste_shiny.png', '/img/maraiste_mini.png', 2, 95, 85, 85, 65, 65, 35, 90, NULL),
(196, 'Mentali', '/img/mentali.png', '/img/mentali_shiny.png', '/img/mentali_mini.png', 2, 65, 65, 60, 130, 95, 110, 45, NULL),
(197, 'Noctali', '/img/noctali.png', '/img/noctali_shiny.png', '/img/noctali_mini.png', 2, 95, 65, 110, 60, 130, 65, 45, NULL),
(198, 'Cornèbre', '/img/cornebre.png', '/img/cornebre_shiny.png', '/img/cornebre_mini.png', 2, 60, 85, 42, 85, 42, 91, 30, NULL),
(199, 'Roigada', '/img/roigada.png', '/img/roigada_shiny.png', '/img/roigada_mini.png', 2, 95, 75, 80, 100, 110, 30, 70, NULL),
(200, 'Feuforêve', '/img/feuforeve.png', '/img/feuforeve_shiny.png', '/img/feuforeve_mini.png', 2, 60, 60, 60, 85, 85, 85, 45, NULL),
(201, 'Zarbi', '/img/zarbi.png', '/img/zarbi_shiny.png', '/img/zarbi_mini.png', 2, 48, 72, 48, 72, 48, 48, 225, NULL),
(202, 'Qulbutoké', '/img/qulbutoke.png', '/img/qulbutoke_shiny.png', '/img/qulbutoke_mini.png', 2, 190, 33, 58, 33, 58, 33, 45, NULL),
(203, 'Girafarig', '/img/girafarig.png', '/img/girafarig_shiny.png', '/img/girafarig_mini.png', 2, 70, 80, 65, 90, 65, 85, 60, NULL),
(204, 'Pomdepik', '/img/pomdepik.png', '/img/pomdepik_shiny.png', '/img/pomdepik_mini.png', 2, 50, 65, 90, 35, 35, 15, 190, NULL),
(205, 'Foretress', '/img/foretress.png', '/img/foretress_shiny.png', '/img/foretress_mini.png', 2, 75, 90, 140, 60, 60, 40, 75, NULL),
(206, 'Insolourdo', '/img/insolourdo.png', '/img/insolourdo_shiny.png', '/img/insolourdo_mini.png', 2, 100, 70, 70, 65, 65, 45, 190, NULL),
(207, 'Scorplane', '/img/scorplane.png', '/img/scorplane_shiny.png', '/img/scorplane_mini.png', 2, 65, 75, 105, 35, 65, 85, 60, NULL),
(208, 'Steelix', '/img/steelix.png', '/img/steelix_shiny.png', '/img/steelix_mini.png', 2, 75, 85, 200, 55, 65, 30, 25, NULL),
(209, 'Snubbull', '/img/snubbull.png', '/img/snubbull_shiny.png', '/img/snubbull_mini.png', 2, 60, 80, 50, 40, 40, 30, 190, NULL),
(210, 'Granbull', '/img/granbull.png', '/img/granbull_shiny.png', '/img/granbull_mini.png', 2, 90, 120, 75, 60, 60, 45, 75, NULL),
(211, 'Qwilfish', '/img/qwilfish.png', '/img/qwilfish_shiny.png', '/img/qwilfish_mini.png', 2, 65, 95, 85, 55, 55, 85, 45, NULL),
(212, 'Cizayox', '/img/cizayox.png', '/img/cizayox_shiny.png', '/img/cizayox_mini.png', 2, 70, 130, 100, 55, 80, 65, 25, NULL),
(213, 'Caratroc', '/img/caratroc.png', '/img/caratroc_shiny.png', '/img/caratroc_mini.png', 2, 20, 10, 230, 10, 230, 5, 190, NULL),
(214, 'Scarhino', '/img/scarhino.png', '/img/scarhino_shiny.png', '/img/scarhino_mini.png', 2, 80, 125, 75, 40, 95, 85, 45, NULL),
(215, 'Farfuret', '/img/farfuret.png', '/img/farfuret_shiny.png', '/img/farfuret_mini.png', 2, 55, 95, 55, 35, 75, 115, 60, NULL),
(216, 'Teddiursa', '/img/teddiursa.png', '/img/teddiursa_shiny.png', '/img/teddiursa_mini.png', 2, 60, 80, 50, 50, 50, 40, 120, NULL),
(217, 'Ursaring', '/img/ursaring.png', '/img/ursaring_shiny.png', '/img/ursaring_mini.png', 2, 90, 130, 75, 75, 75, 55, 60, NULL),
(218, 'Limagma', '/img/limagma.png', '/img/limagma_shiny.png', '/img/limagma_mini.png', 2, 40, 40, 40, 70, 40, 20, 190, NULL),
(219, 'Volcaropod', '/img/volcaropod.png', '/img/volcaropod_shiny.png', '/img/volcaropod_mini.png', 2, 60, 50, 120, 90, 80, 30, 75, NULL),
(220, 'Marcacrin', '/img/marcacrin.png', '/img/marcacrin_shiny.png', '/img/marcacrin_mini.png', 2, 50, 50, 40, 30, 30, 50, 225, NULL),
(221, 'Cochignon', '/img/cochignon.png', '/img/cochignon_shiny.png', '/img/cochignon_mini.png', 2, 100, 100, 80, 60, 60, 50, 75, NULL),
(222, 'Corayon', '/img/corayon.png', '/img/corayon_shiny.png', '/img/corayon_mini.png', 2, 65, 55, 95, 65, 95, 35, 60, NULL),
(223, 'Rémoraid', '/img/remoraid.png', '/img/remoraid_shiny.png', '/img/remoraid_mini.png', 2, 35, 65, 35, 65, 35, 65, 190, NULL),
(224, 'Octillery', '/img/octillery.png', '/img/octillery_shiny.png', '/img/octillery_mini.png', 2, 75, 105, 75, 105, 75, 45, 75, NULL),
(225, 'Cadoizo', '/img/cadoizo.png', '/img/cadoizo_shiny.png', '/img/cadoizo_mini.png', 2, 45, 55, 45, 65, 45, 75, 45, NULL),
(226, 'Démanta', '/img/demanta.png', '/img/demanta_shiny.png', '/img/demanta_mini.png', 2, 85, 40, 70, 80, 140, 70, 25, NULL),
(227, 'Airmure', '/img/airmure.png', '/img/airmure_shiny.png', '/img/airmure_mini.png', 2, 65, 80, 140, 40, 70, 70, 25, NULL),
(228, 'Malosse', '/img/malosse.png', '/img/malosse_shiny.png', '/img/malosse_mini.png', 2, 45, 60, 30, 80, 50, 65, 120, NULL),
(229, 'Démolosse', '/img/demolosse.png', '/img/demolosse_shiny.png', '/img/demolosse_mini.png', 2, 75, 90, 50, 110, 80, 95, 45, NULL),
(230, 'Hyporoi', '/img/hyporoi.png', '/img/hyporoi_shiny.png', '/img/hyporoi_mini.png', 2, 75, 95, 95, 95, 95, 85, 45, NULL),
(231, 'Phanpy', '/img/phanpy.png', '/img/phanpy_shiny.png', '/img/phanpy_mini.png', 2, 90, 60, 60, 40, 40, 40, 120, NULL),
(232, 'Donphan', '/img/donphan.png', '/img/donphan_shiny.png', '/img/donphan_mini.png', 2, 90, 120, 120, 60, 60, 50, 60, NULL),
(233, 'Porygon2', '/img/porygon2.png', '/img/porygon2_shiny.png', '/img/porygon2_mini.png', 2, 85, 80, 90, 105, 95, 60, 45, NULL),
(234, 'Cerfrousse', '/img/cerfrousse.png', '/img/cerfrousse_shiny.png', '/img/cerfrousse_mini.png', 2, 73, 95, 62, 85, 65, 85, 45, NULL),
(235, 'Queulorior', '/img/queulorior.png', '/img/queulorior_shiny.png', '/img/queulorior_mini.png', 2, 55, 20, 35, 20, 45, 75, 45, NULL),
(236, 'Debugant', '/img/debugant.png', '/img/debugant_shiny.png', '/img/debugant_mini.png', 2, 35, 35, 35, 35, 35, 35, 75, NULL),
(237, 'Kapoera', '/img/kapoera.png', '/img/kapoera_shiny.png', '/img/kapoera_mini.png', 2, 50, 95, 95, 35, 110, 70, 45, NULL),
(238, 'Lippouti', '/img/lippouti.png', '/img/lippouti_shiny.png', '/img/lippouti_mini.png', 2, 45, 30, 15, 85, 65, 65, 45, NULL),
(239, 'Élekid', '/img/elekid.png', '/img/elekid_shiny.png', '/img/elekid_mini.png', 2, 45, 63, 37, 65, 55, 95, 45, NULL),
(240, 'Magby', '/img/magby.png', '/img/magby_shiny.png', '/img/magby_mini.png', 2, 45, 75, 37, 70, 55, 83, 45, NULL),
(241, 'Écrémeuh', '/img/ecremeuh.png', '/img/ecremeuh_shiny.png', '/img/ecremeuh_mini.png', 2, 95, 80, 105, 40, 70, 100, 45, NULL),
(242, 'Leuphorie', '/img/leuphorie.png', '/img/leuphorie_shiny.png', '/img/leuphorie_mini.png', 2, 255, 10, 10, 75, 135, 55, 30, NULL),
(243, 'Raikou', '/img/raikou.png', '/img/raikou_shiny.png', '/img/raikou_mini.png', 2, 90, 85, 75, 115, 100, 115, 3, 'Légendaire'),
(244, 'Entei', '/img/entei.png', '/img/entei_shiny.png', '/img/entei_mini.png', 2, 115, 115, 85, 90, 75, 100, 3, 'Légendaire'),
(245, 'Suicune', '/img/suicune.png', '/img/suicune_shiny.png', '/img/suicune_mini.png', 2, 100, 75, 115, 90, 115, 85, 3, 'Légendaire'),
(246, 'Embrylex', '/img/embrylex.png', '/img/embrylex_shiny.png', '/img/embrylex_mini.png', 2, 50, 64, 50, 45, 50, 41, 45, 'Surpuissant'),
(247, 'Ymphect', '/img/ymphect.png', '/img/ymphect_shiny.png', '/img/ymphect_mini.png', 2, 70, 84, 70, 65, 70, 51, 45, 'Surpuissant'),
(248, 'Tyranocif', '/img/tyranocif.png', '/img/tyranocif_shiny.png', '/img/tyranocif_mini.png', 2, 100, 134, 110, 95, 100, 61, 45, 'Surpuissant'),
(249, 'Lugia', '/img/lugia.png', '/img/lugia_shiny.png', '/img/lugia_mini.png', 2, 106, 90, 130, 90, 154, 110, 3, 'Légendaire'),
(250, 'Ho‑Oh', '/img/ho-oh.png', '/img/ho-oh_shiny.png', '/img/ho-oh_mini.png', 2, 106, 130, 90, 110, 154, 90, 3, 'Légendaire'),
(251, 'Celebi', '/img/celebi.png', '/img/celebi_shiny.png', '/img/celebi_mini.png', 2, 100, 100, 100, 100, 100, 100, 45, 'Fabuleux'),
(252, 'Arcko', '/img/arcko.png', '/img/arcko_shiny.png', '/img/arcko_mini.png', 3, 40, 45, 35, 65, 55, 70, 45, NULL),
(253, 'Massko', '/img/massko.png', '/img/massko_shiny.png', '/img/massko_mini.png', 3, 50, 65, 45, 85, 65, 95, 45, NULL),
(254, 'Jungko', '/img/jungko.png', '/img/jungko_shiny.png', '/img/jungko_mini.png', 3, 70, 85, 65, 105, 85, 120, 45, NULL),
(255, 'Poussifeu', '/img/poussifeu.png', '/img/poussifeu_shiny.png', '/img/poussifeu_mini.png', 3, 45, 60, 40, 70, 50, 45, 45, NULL),
(256, 'Galifeu', '/img/galifeu.png', '/img/galifeu_shiny.png', '/img/galifeu_mini.png', 3, 60, 85, 60, 85, 60, 55, 45, NULL),
(257, 'Braségali', '/img/brasegali.png', '/img/brasegali_shiny.png', '/img/brasegali_mini.png', 3, 80, 120, 70, 110, 70, 80, 45, NULL),
(258, 'Gobou', '/img/gobou.png', '/img/gobou_shiny.png', '/img/gobou_mini.png', 3, 50, 70, 50, 50, 50, 40, 45, NULL),
(259, 'Flobio', '/img/flobio.png', '/img/flobio_shiny.png', '/img/flobio_mini.png', 3, 70, 85, 70, 60, 70, 50, 45, NULL),
(260, 'Laggron', '/img/laggron.png', '/img/laggron_shiny.png', '/img/laggron_mini.png', 3, 100, 110, 90, 85, 90, 60, 45, NULL),
(261, 'Medhyèna', '/img/medhyena.png', '/img/medhyena_shiny.png', '/img/medhyena_mini.png', 3, 35, 55, 35, 30, 30, 35, 255, NULL),
(262, 'Grahyèna', '/img/grahyena.png', '/img/grahyena_shiny.png', '/img/grahyena_mini.png', 3, 70, 90, 70, 60, 60, 70, 127, NULL),
(263, 'Zigzaton', '/img/zigzaton.png', '/img/zigzaton_shiny.png', '/img/zigzaton_mini.png', 3, 38, 30, 41, 30, 41, 60, 255, NULL),
(264, 'Linéon', '/img/lineon.png', '/img/lineon_shiny.png', '/img/lineon_mini.png', 3, 78, 70, 61, 50, 61, 100, 90, NULL),
(265, 'Chenipotte', '/img/chenipotte.png', '/img/chenipotte_shiny.png', '/img/chenipotte_mini.png', 3, 45, 45, 35, 20, 30, 20, 255, NULL),
(266, 'Armulys', '/img/armulys.png', '/img/armulys_shiny.png', '/img/armulys_mini.png', 3, 50, 35, 55, 25, 25, 15, 120, NULL),
(267, 'Charmillon', '/img/charmillon.png', '/img/charmillon_shiny.png', '/img/charmillon_mini.png', 3, 60, 70, 50, 100, 50, 65, 45, NULL),
(268, 'Blindalys', '/img/blindalys.png', '/img/blindalys_shiny.png', '/img/blindalys_mini.png', 3, 50, 35, 55, 25, 25, 15, 120, NULL),
(269, 'Papinox', '/img/papinox.png', '/img/papinox_shiny.png', '/img/papinox_mini.png', 3, 60, 50, 70, 50, 90, 65, 45, NULL),
(270, 'Nénupiot', '/img/nenupiot.png', '/img/nenupiot_shiny.png', '/img/nenupiot_mini.png', 3, 40, 30, 30, 40, 50, 30, 255, NULL),
(271, 'Lombre', '/img/lombre.png', '/img/lombre_shiny.png', '/img/lombre_mini.png', 3, 60, 50, 50, 60, 70, 50, 120, NULL),
(272, 'Ludicolo', '/img/ludicolo.png', '/img/ludicolo_shiny.png', '/img/ludicolo_mini.png', 3, 80, 70, 70, 90, 100, 70, 45, NULL),
(273, 'Grainipiot', '/img/grainipiot.png', '/img/grainipiot_shiny.png', '/img/grainipiot_mini.png', 3, 40, 40, 50, 30, 30, 30, 255, NULL),
(274, 'Pifeuil', '/img/pifeuil.png', '/img/pifeuil_shiny.png', '/img/pifeuil_mini.png', 3, 70, 70, 40, 60, 40, 60, 120, NULL),
(275, 'Tengalice', '/img/tengalice.png', '/img/tengalice_shiny.png', '/img/tengalice_mini.png', 3, 90, 100, 60, 90, 60, 80, 45, NULL),
(276, 'Nirondelle', '/img/nirondelle.png', '/img/nirondelle_shiny.png', '/img/nirondelle_mini.png', 3, 40, 55, 30, 30, 30, 85, 200, NULL),
(277, 'Hélédelle', '/img/heledelle.png', '/img/heledelle_shiny.png', '/img/heledelle_mini.png', 3, 60, 85, 60, 75, 50, 125, 45, NULL),
(278, 'Goélise', '/img/goelise.png', '/img/goelise_shiny.png', '/img/goelise_mini.png', 3, 40, 30, 30, 55, 30, 85, 190, NULL),
(279, 'Bekipan', '/img/bekipan.png', '/img/bekipan_shiny.png', '/img/bekipan_mini.png', 3, 60, 50, 100, 95, 70, 65, 45, NULL),
(280, 'Tarsal', '/img/tarsal.png', '/img/tarsal_shiny.png', '/img/tarsal_mini.png', 3, 28, 25, 25, 45, 35, 40, 235, NULL),
(281, 'Kirlia', '/img/kirlia.png', '/img/kirlia_shiny.png', '/img/kirlia_mini.png', 3, 38, 35, 35, 65, 55, 50, 120, NULL),
(282, 'Gardevoir', '/img/gardevoir.png', '/img/gardevoir_shiny.png', '/img/gardevoir_mini.png', 3, 68, 65, 65, 125, 115, 80, 45, NULL),
(283, 'Arakdo', '/img/arakdo.png', '/img/arakdo_shiny.png', '/img/arakdo_mini.png', 3, 40, 30, 32, 50, 52, 65, 200, NULL),
(284, 'Maskadra', '/img/maskadra.png', '/img/maskadra_shiny.png', '/img/maskadra_mini.png', 3, 70, 60, 62, 100, 82, 80, 75, NULL),
(285, 'Balignon', '/img/balignon.png', '/img/balignon_shiny.png', '/img/balignon_mini.png', 3, 60, 40, 60, 40, 60, 35, 255, NULL),
(286, 'Chapignon', '/img/chapignon.png', '/img/chapignon_shiny.png', '/img/chapignon_mini.png', 3, 60, 130, 80, 60, 60, 70, 90, NULL),
(287, 'Parecool', '/img/parecool.png', '/img/parecool_shiny.png', '/img/parecool_mini.png', 3, 60, 60, 60, 35, 35, 30, 255, NULL),
(288, 'Vigoroth', '/img/vigoroth.png', '/img/vigoroth_shiny.png', '/img/vigoroth_mini.png', 3, 80, 80, 80, 55, 55, 90, 120, NULL),
(289, 'Monaflèmit', '/img/monaflemit.png', '/img/monaflemit_shiny.png', '/img/monaflemit_mini.png', 3, 150, 160, 100, 95, 65, 100, 45, NULL),
(290, 'Ningale', '/img/ningale.png', '/img/ningale_shiny.png', '/img/ningale_mini.png', 3, 31, 45, 90, 30, 30, 40, 255, NULL),
(291, 'Ninjask', '/img/ninjask.png', '/img/ninjask_shiny.png', '/img/ninjask_mini.png', 3, 61, 90, 45, 50, 50, 160, 120, NULL),
(292, 'Munja', '/img/munja.png', '/img/munja_shiny.png', '/img/munja_mini.png', 3, 1, 90, 45, 30, 30, 40, 45, NULL),
(293, 'Chuchmur', '/img/chuchmur.png', '/img/chuchmur_shiny.png', '/img/chuchmur_mini.png', 3, 64, 51, 23, 51, 23, 28, 190, NULL),
(294, 'Ramboum', '/img/ramboum.png', '/img/ramboum_shiny.png', '/img/ramboum_mini.png', 3, 84, 71, 43, 71, 43, 48, 120, NULL),
(295, 'Brouhabam', '/img/brouhabam.png', '/img/brouhabam_shiny.png', '/img/brouhabam_mini.png', 3, 104, 91, 63, 91, 73, 68, 45, NULL),
(296, 'Makuhita', '/img/makuhita.png', '/img/makuhita_shiny.png', '/img/makuhita_mini.png', 3, 72, 60, 30, 20, 30, 25, 180, NULL),
(297, 'Hariyama', '/img/hariyama.png', '/img/hariyama_shiny.png', '/img/hariyama_mini.png', 3, 144, 120, 60, 40, 60, 50, 200, NULL),
(298, 'Azurill', '/img/azurill.png', '/img/azurill_shiny.png', '/img/azurill_mini.png', 3, 50, 20, 40, 20, 40, 20, 150, NULL),
(299, 'Tarinor', '/img/tarinor.png', '/img/tarinor_shiny.png', '/img/tarinor_mini.png', 3, 30, 45, 135, 45, 90, 30, 255, NULL),
(300, 'Skitty', '/img/skitty.png', '/img/skitty_shiny.png', '/img/skitty_mini.png', 3, 50, 45, 45, 35, 35, 50, 255, NULL),
(301, 'Delcatty', '/img/delcatty.png', '/img/delcatty_shiny.png', '/img/delcatty_mini.png', 3, 70, 65, 65, 55, 55, 90, 60, NULL),
(302, 'Ténéfix', '/img/tenefix.png', '/img/tenefix_shiny.png', '/img/tenefix_mini.png', 3, 50, 75, 75, 65, 65, 50, 45, NULL),
(303, 'Mysdibule', '/img/mysdibule.png', '/img/mysdibule_shiny.png', '/img/mysdibule_mini.png', 3, 50, 85, 85, 55, 55, 50, 45, NULL),
(304, 'Galekid', '/img/galekid.png', '/img/galekid_shiny.png', '/img/galekid_mini.png', 3, 50, 70, 100, 40, 40, 30, 180, NULL),
(305, 'Galegon', '/img/galegon.png', '/img/galegon_shiny.png', '/img/galegon_mini.png', 3, 60, 90, 140, 50, 50, 40, 90, NULL),
(306, 'Galeking', '/img/galeking.png', '/img/galeking_shiny.png', '/img/galeking_mini.png', 3, 70, 110, 180, 60, 60, 50, 45, NULL),
(307, 'Méditikka', '/img/meditikka.png', '/img/meditikka_shiny.png', '/img/meditikka_mini.png', 3, 30, 40, 55, 40, 55, 60, 180, NULL),
(308, 'Charmina', '/img/charmina.png', '/img/charmina_shiny.png', '/img/charmina_mini.png', 3, 60, 60, 75, 60, 75, 80, 90, NULL),
(309, 'Dynavolt', '/img/dynavolt.png', '/img/dynavolt_shiny.png', '/img/dynavolt_mini.png', 3, 40, 45, 40, 65, 40, 65, 120, NULL),
(310, 'Élecsprint', '/img/elecsprint.png', '/img/elecsprint_shiny.png', '/img/elecsprint_mini.png', 3, 70, 75, 60, 105, 60, 105, 45, NULL),
(311, 'Posipi', '/img/posipi.png', '/img/posipi_shiny.png', '/img/posipi_mini.png', 3, 60, 50, 40, 85, 75, 95, 200, NULL),
(312, 'Négapi', '/img/negapi.png', '/img/negapi_shiny.png', '/img/negapi_mini.png', 3, 60, 40, 50, 75, 85, 95, 200, NULL),
(313, 'Muciole', '/img/muciole.png', '/img/muciole_shiny.png', '/img/muciole_mini.png', 3, 65, 73, 55, 47, 75, 85, 150, NULL),
(314, 'Lumivole', '/img/lumivole.png', '/img/lumivole_shiny.png', '/img/lumivole_mini.png', 3, 65, 47, 55, 73, 75, 85, 150, NULL),
(315, 'Rosélia', '/img/roselia.png', '/img/roselia_shiny.png', '/img/roselia_mini.png', 3, 50, 60, 45, 100, 80, 65, 150, NULL),
(316, 'Gloupti', '/img/gloupti.png', '/img/gloupti_shiny.png', '/img/gloupti_mini.png', 3, 70, 43, 53, 43, 53, 40, 225, NULL),
(317, 'Avaltout', '/img/avaltout.png', '/img/avaltout_shiny.png', '/img/avaltout_mini.png', 3, 100, 73, 83, 73, 83, 55, 75, NULL),
(318, 'Carvanha', '/img/carvanha.png', '/img/carvanha_shiny.png', '/img/carvanha_mini.png', 3, 45, 90, 20, 65, 20, 65, 225, NULL),
(319, 'Sharpedo', '/img/sharpedo.png', '/img/sharpedo_shiny.png', '/img/sharpedo_mini.png', 3, 70, 120, 40, 95, 40, 95, 60, NULL),
(320, 'Wailmer', '/img/wailmer.png', '/img/wailmer_shiny.png', '/img/wailmer_mini.png', 3, 130, 70, 35, 70, 35, 60, 125, NULL),
(321, 'Wailord', '/img/wailord.png', '/img/wailord_shiny.png', '/img/wailord_mini.png', 3, 170, 90, 45, 90, 45, 60, 60, NULL),
(322, 'Chamallot', '/img/chamallot.png', '/img/chamallot_shiny.png', '/img/chamallot_mini.png', 3, 60, 60, 40, 65, 45, 35, 255, NULL),
(323, 'Camérupt', '/img/camerupt.png', '/img/camerupt_shiny.png', '/img/camerupt_mini.png', 3, 70, 100, 70, 105, 75, 40, 150, NULL),
(324, 'Chartor', '/img/chartor.png', '/img/chartor_shiny.png', '/img/chartor_mini.png', 3, 70, 85, 140, 85, 70, 20, 90, NULL),
(325, 'Spoink', '/img/spoink.png', '/img/spoink_shiny.png', '/img/spoink_mini.png', 3, 60, 25, 35, 70, 80, 60, 255, NULL),
(326, 'Groret', '/img/groret.png', '/img/groret_shiny.png', '/img/groret_mini.png', 3, 80, 45, 65, 90, 110, 80, 60, NULL),
(327, 'Spinda', '/img/spinda.png', '/img/spinda_shiny.png', '/img/spinda_mini.png', 3, 60, 60, 60, 60, 60, 60, 255, NULL),
(328, 'Kraknoix', '/img/kraknoix.png', '/img/kraknoix_shiny.png', '/img/kraknoix_mini.png', 3, 45, 100, 45, 45, 45, 10, 255, NULL),
(329, 'Vibraninf', '/img/vibraninf.png', '/img/vibraninf_shiny.png', '/img/vibraninf_mini.png', 3, 50, 70, 50, 50, 50, 70, 120, NULL),
(330, 'Libégon', '/img/libegon.png', '/img/libegon_shiny.png', '/img/libegon_mini.png', 3, 80, 100, 80, 80, 80, 100, 45, NULL),
(331, 'Cacnea', '/img/cacnea.png', '/img/cacnea_shiny.png', '/img/cacnea_mini.png', 3, 50, 85, 40, 85, 40, 35, 190, NULL),
(332, 'Cacturne', '/img/cacturne.png', '/img/cacturne_shiny.png', '/img/cacturne_mini.png', 3, 70, 115, 60, 115, 60, 55, 60, NULL),
(333, 'Tylton', '/img/tylton.png', '/img/tylton_shiny.png', '/img/tylton_mini.png', 3, 45, 40, 60, 40, 75, 50, 255, NULL),
(334, 'Altaria', '/img/altaria.png', '/img/altaria_shiny.png', '/img/altaria_mini.png', 3, 75, 70, 90, 70, 105, 80, 45, NULL),
(335, 'Mangriff', '/img/mangriff.png', '/img/mangriff_shiny.png', '/img/mangriff_mini.png', 3, 73, 115, 60, 60, 60, 90, 90, NULL),
(336, 'Séviper', '/img/seviper.png', '/img/seviper_shiny.png', '/img/seviper_mini.png', 3, 73, 100, 60, 100, 60, 65, 90, NULL),
(337, 'Séléroc', '/img/seleroc.png', '/img/seleroc_shiny.png', '/img/seleroc_mini.png', 3, 90, 55, 65, 95, 85, 70, 45, NULL),
(338, 'Solaroc', '/img/solaroc.png', '/img/solaroc_shiny.png', '/img/solaroc_mini.png', 3, 90, 95, 85, 55, 65, 70, 45, NULL),
(339, 'Barloche', '/img/barloche.png', '/img/barloche_shiny.png', '/img/barloche_mini.png', 3, 50, 48, 43, 46, 41, 60, 190, NULL),
(340, 'Barbicha', '/img/barbicha.png', '/img/barbicha_shiny.png', '/img/barbicha_mini.png', 3, 110, 78, 73, 76, 71, 60, 75, NULL),
(341, 'Écrapince', '/img/ecrapince.png', '/img/ecrapince_shiny.png', '/img/ecrapince_mini.png', 3, 43, 80, 65, 50, 35, 35, 205, NULL),
(342, 'Colhomard', '/img/colhomard.png', '/img/colhomard_shiny.png', '/img/colhomard_mini.png', 3, 63, 120, 85, 90, 55, 55, 155, NULL),
(343, 'Balbuto', '/img/balbuto.png', '/img/balbuto_shiny.png', '/img/balbuto_mini.png', 3, 40, 40, 55, 40, 70, 55, 255, NULL),
(344, 'Kaorine', '/img/kaorine.png', '/img/kaorine_shiny.png', '/img/kaorine_mini.png', 3, 55, 50, 85, 95, 40, 40, 90, NULL),
(345, 'Lilia', '/img/lilia.png', '/img/lilia_shiny.png', '/img/lilia_mini.png', 3, 70, 65, 60, 130, 90, 65, 45, NULL),
(346, 'Vacilys', '/img/vacilys.png', '/img/vacilys_shiny.png', '/img/vacilys_mini.png', 3, 100, 95, 85, 40, 70, 70, 45, NULL),
(347, 'Anorith', '/img/anorith.png', '/img/anorith_shiny.png', '/img/anorith_mini.png', 3, 45, 95, 50, 40, 50, 75, 45, NULL),
(348, 'Armaldo', '/img/armaldo.png', '/img/armaldo_shiny.png', '/img/armaldo_mini.png', 3, 75, 125, 100, 70, 80, 45, 45, NULL),
(349, 'Barpau', '/img/barpau.png', '/img/barpau_shiny.png', '/img/barpau_mini.png', 3, 20, 10, 55, 15, 20, 80, 255, NULL),
(350, 'Milobellus', '/img/milobellus.png', '/img/milobellus_shiny.png', '/img/milobellus_mini.png', 3, 100, 60, 70, 85, 105, 60, 60, NULL),
(351, 'Morphéo', '/img/morpheo.png', '/img/morpheo_shiny.png', '/img/morpheo_mini.png', 3, 70, 80, 70, 80, 70, 70, 45, NULL),
(352, 'Kecleon', '/img/kecleon.png', '/img/kecleon_shiny.png', '/img/kecleon_mini.png', 3, 60, 90, 70, 60, 120, 40, 200, NULL),
(353, 'Polichombr', '/img/polichombr.png', '/img/polichombr_shiny.png', '/img/polichombr_mini.png', 3, 45, 80, 60, 50, 50, 75, 225, NULL),
(354, 'Branette', '/img/branette.png', '/img/branette_shiny.png', '/img/branette_mini.png', 3, 65, 115, 75, 65, 75, 80, 45, NULL),
(355, 'Skélénox', '/img/skelenox.png', '/img/skelenox_shiny.png', '/img/skelenox_mini.png', 3, 50, 50, 95, 40, 50, 35, 190, NULL),
(356, 'Téraclope', '/img/teraclope.png', '/img/teraclope_shiny.png', '/img/teraclope_mini.png', 3, 60, 55, 145, 75, 150, 40, 90, NULL),
(357, 'Tropius', '/img/tropius.png', '/img/tropius_shiny.png', '/img/tropius_mini.png', 3, 99, 68, 83, 72, 87, 51, 200, NULL),
(358, 'Éoko', '/img/eoko.png', '/img/eoko_shiny.png', '/img/eoko_mini.png', 3, 65, 130, 60, 75, 60, 75, 45, NULL),
(359, 'Absol', '/img/absol.png', '/img/absol_shiny.png', '/img/absol_mini.png', 3, 65, 130, 60, 75, 60, 75, 30, NULL),
(360, 'Okéoké', '/img/okeoke.png', '/img/okeoke_shiny.png', '/img/okeoke_mini.png', 3, 95, 130, 120, 80, 120, 100, 125, NULL),
(361, 'Stalgamin', '/img/stalgamin.png', '/img/stalgamin_shiny.png', '/img/stalgamin_mini.png', 3, 50, 50, 50, 65, 65, 50, 190, NULL),
(362, 'Oniglali', '/img/oniglali.png', '/img/oniglali_shiny.png', '/img/oniglali_mini.png', 3, 80, 80, 80, 95, 95, 70, 75, NULL),
(363, 'Obalie', '/img/obalie.png', '/img/obalie_shiny.png', '/img/obalie_mini.png', 3, 65, 60, 55, 40, 70, 45, 255, NULL),
(364, 'Phogleur', '/img/phogleur.png', '/img/phogleur_shiny.png', '/img/phogleur_mini.png', 3, 90, 85, 70, 70, 70, 70, 120, NULL),
(365, 'Kaimorse', '/img/kaimorse.png', '/img/kaimorse_shiny.png', '/img/kaimorse_mini.png', 3, 95, 120, 85, 70, 80, 50, 45, NULL),
(366, 'Coquiperl', '/img/coquiperl.png', '/img/coquiperl_shiny.png', '/img/coquiperl_mini.png', 3, 35, 64, 85, 74, 55, 32, 255, NULL),
(367, 'Serpang', '/img/serpang.png', '/img/serpang_shiny.png', '/img/serpang_mini.png', 3, 55, 104, 105, 94, 75, 52, 60, NULL),
(368, 'Rosabyss', '/img/rosabyss.png', '/img/rosabyss_shiny.png', '/img/rosabyss_mini.png', 3, 95, 60, 79, 100, 125, 81, 60, NULL),
(369, 'Relicanth', '/img/relicanth.png', '/img/relicanth_shiny.png', '/img/relicanth_mini.png', 3, 100, 90, 130, 45, 65, 55, 25, NULL),
(370, 'Lovdisc', '/img/lovdisc.png', '/img/lovdisc_shiny.png', '/img/lovdisc_mini.png', 3, 43, 30, 55, 40, 65, 97, 225, NULL),
(371, 'Draby', '/img/draby.png', '/img/draby_shiny.png', '/img/draby_mini.png', 3, 45, 75, 60, 40, 50, 50, 45, NULL),
(372, 'Drackhaus', '/img/drackhaus.png', '/img/drackhaus_shiny.png', '/img/drackhaus_mini.png', 3, 65, 95, 100, 60, 50, 50, 45, NULL),
(373, 'Drattak', '/img/drattak.png', '/img/drattak_shiny.png', '/img/drattak_mini.png', 3, 95, 135, 80, 110, 80, 100, 45, NULL),
(374, 'Terhal', '/img/terhal.png', '/img/terhal_shiny.png', '/img/terhal_mini.png', 3, 40, 55, 80, 35, 60, 30, 3, NULL),
(375, 'Métang', '/img/metang.png', '/img/metang_shiny.png', '/img/metang_mini.png', 3, 60, 75, 100, 55, 80, 50, 3, NULL),
(376, 'Métalosse', '/img/metalosse.png', '/img/metalosse_shiny.png', '/img/metalosse_mini.png', 3, 80, 135, 130, 95, 90, 70, 3, NULL),
(377, 'Regirock', '/img/regirock.png', '/img/regirock_shiny.png', '/img/regirock_mini.png', 3, 80, 100, 200, 50, 100, 50, 3, 'Légendaire'),
(378, 'Regice', '/img/regice.png', '/img/regice_shiny.png', '/img/regice_mini.png', 3, 80, 50, 100, 100, 200, 50, 3, 'Légendaire'),
(379, 'Registeel', '/img/registeel.png', '/img/registeel_shiny.png', '/img/registeel_mini.png', 3, 80, 75, 150, 75, 150, 50, 3, 'Légendaire'),
(380, 'Latias', '/img/latias.png', '/img/latias_shiny.png', '/img/latias_mini.png', 3, 80, 80, 90, 110, 130, 110, 3, 'Légendaire'),
(381, 'Latios', '/img/latios.png', '/img/latios_shiny.png', '/img/latios_mini.png', 3, 80, 90, 80, 130, 110, 110, 3, 'Légendaire'),
(382, 'Kyogre', '/img/kyogre.png', '/img/kyogre_shiny.png', '/img/kyogre_mini.png', 3, 100, 100, 90, 150, 140, 90, 5, 'Légendaire'),
(383, 'Groudon', '/img/groudon.png', '/img/groudon_shiny.png', '/img/groudon_mini.png', 3, 100, 150, 140, 100, 90, 90, 5, 'Légendaire'),
(384, 'Rayquaza', '/img/rayquaza.png', '/img/rayquaza_shiny.png', '/img/rayquaza_mini.png', 3, 105, 150, 90, 150, 90, 95, 45, 'Légendaire'),
(385, 'Jirachi', '/img/jirachi.png', '/img/jirachi_shiny.png', '/img/jirachi_mini.png', 3, 100, 100, 100, 100, 100, 100, 3, 'Fabuleux'),
(386, 'Deoxys', '/img/deoxys.png', '/img/deoxys_shiny.png', '/img/deoxys_mini.png', 3, 50, 150, 50, 150, 50, 150, 3, 'Fabuleux'),
(387, 'Tortipouss', '/img/tortipouss.png', '/img/tortipouss_shiny.png', '/img/tortipouss_mini.png', 4, 55, 68, 64, 45, 55, 31, 45, 'Starter'),
(388, 'Boskara', '/img/boskara.png', '/img/boskara_shiny.png', '/img/boskara_mini.png', 4, 75, 89, 85, 55, 65, 36, 45, 'Starter'),
(389, 'Torterra', '/img/torterra.png', '/img/torterra_shiny.png', '/img/torterra_mini.png', 4, 95, 109, 105, 75, 85, 56, 45, 'Starter');
INSERT INTO `pokemon` (`num_pokedex`, `nom`, `img`, `img_shiny`, `img_mini`, `generation`, `hp`, `attaque`, `defense`, `attaque_spe`, `defense_spe`, `vitesse`, `taux_capture`, `rarete`) VALUES
(390, 'Ouisticram', '/img/ouisticram.png', '/img/ouisticram_shiny.png', '/img/ouisticram_mini.png', 4, 44, 58, 44, 58, 44, 61, 45, 'Starter'),
(391, 'Chimpenfeu', '/img/chimpenfeu.png', '/img/chimpenfeu_shiny.png', '/img/chimpenfeu_mini.png', 4, 64, 78, 52, 78, 52, 81, 45, 'Starter'),
(392, 'Simiabraz', '/img/simiabraz.png', '/img/simiabraz_shiny.png', '/img/simiabraz_mini.png', 4, 76, 104, 71, 104, 71, 108, 45, 'Starter'),
(393, 'Tiplouf', '/img/tiplouf.png', '/img/tiplouf_shiny.png', '/img/tiplouf_mini.png', 4, 53, 51, 53, 61, 56, 40, 45, 'Starter'),
(394, 'Prinplouf', '/img/prinplouf.png', '/img/prinplouf_shiny.png', '/img/prinplouf_mini.png', 4, 64, 66, 68, 81, 76, 50, 45, 'Starter'),
(395, 'Pingoléon', '/img/pingoleon.png', '/img/pingoleon_shiny.png', '/img/pingoleon_mini.png', 4, 84, 86, 88, 111, 101, 60, 45, 'Starter'),
(396, 'Étourmi', '/img/etourmi.png', '/img/etourmi_shiny.png', '/img/etourmi_mini.png', 4, 40, 55, 30, 30, 30, 60, 255, ''),
(397, 'Étourvol', '/img/etourvol.png', '/img/etourvol_shiny.png', '/img/etourvol_mini.png', 4, 85, 80, 50, 40, 50, 100, 120, ''),
(398, 'Étouraptor', '/img/etouraptor.png', '/img/etouraptor_shiny.png', '/img/etouraptor_mini.png', 4, 85, 120, 70, 50, 60, 100, 45, ''),
(399, 'Keunotor', '/img/keunotor.png', '/img/keunotor_shiny.png', '/img/keunotor_mini.png', 4, 40, 55, 30, 30, 30, 30, 255, ''),
(400, 'Castorno', '/img/castorno.png', '/img/castorno_shiny.png', '/img/castorno_mini.png', 4, 70, 85, 50, 55, 50, 50, 120, ''),
(401, 'Crikzik', '/img/crikzik.png', '/img/crikzik_shiny.png', '/img/crikzik_mini.png', 4, 37, 25, 41, 25, 41, 25, 255, ''),
(402, 'Mélokrik', '/img/melokrik.png', '/img/melokrik_shiny.png', '/img/melokrik_mini.png', 4, 77, 85, 51, 55, 51, 65, 120, ''),
(403, 'Lixy', '/img/lixy.png', '/img/lixy_shiny.png', '/img/lixy_mini.png', 4, 40, 45, 40, 65, 40, 60, 190, ''),
(404, 'Luxio', '/img/luxio.png', '/img/luxio_shiny.png', '/img/luxio_mini.png', 4, 60, 85, 49, 60, 49, 60, 90, ''),
(405, 'Luxray', '/img/luxray.png', '/img/luxray_shiny.png', '/img/luxray_mini.png', 4, 80, 120, 79, 95, 79, 70, 45, ''),
(406, 'Rozbouton', '/img/rozbouton.png', '/img/rozbouton_shiny.png', '/img/rozbouton_mini.png', 4, 45, 35, 45, 62, 53, 35, 190, ''),
(407, 'Roserade', '/img/roserade.png', '/img/roserade_shiny.png', '/img/roserade_mini.png', 4, 60, 70, 55, 125, 105, 90, 75, ''),
(408, 'Kranidos', '/img/kranidos.png', '/img/kranidos_shiny.png', '/img/kranidos_mini.png', 4, 67, 125, 40, 30, 30, 58, 45, ''),
(409, 'Charkos', '/img/charkos.png', '/img/charkos_shiny.png', '/img/charkos_mini.png', 4, 97, 165, 60, 65, 50, 58, 45, ''),
(410, 'Dinoclier', '/img/dinoclier.png', '/img/dinoclier_shiny.png', '/img/dinoclier_mini.png', 4, 50, 70, 40, 50, 50, 30, 45, ''),
(411, 'Bastiodon', '/img/bastiodon.png', '/img/bastiodon_shiny.png', '/img/bastiodon_mini.png', 4, 60, 52, 168, 47, 138, 30, 30, ''),
(412, 'Cheniti', '/img/cheniti.png', '/img/cheniti_shiny.png', '/img/cheniti_mini.png', 4, 45, 30, 35, 20, 20, 45, 255, ''),
(413, 'Cheniselle', '/img/cheniselle.png', '/img/cheniselle_shiny.png', '/img/cheniselle_mini.png', 4, 50, 20, 55, 25, 25, 30, 120, ''),
(414, 'Papilord', '/img/papilord.png', '/img/papilord_shiny.png', '/img/papilord_mini.png', 4, 70, 50, 50, 90, 50, 65, 45, ''),
(415, 'Apitrini', '/img/apitrini.png', '/img/apitrini_shiny.png', '/img/apitrini_mini.png', 4, 40, 45, 40, 35, 40, 84, 120, ''),
(416, 'Apireine', '/img/apireine.png', '/img/apireine_shiny.png', '/img/apireine_mini.png', 4, 60, 80, 70, 80, 70, 114, 45, ''),
(417, 'Pachirisu', '/img/pachirisu.png', '/img/pachirisu_shiny.png', '/img/pachirisu_mini.png', 4, 60, 45, 70, 45, 90, 95, 200, ''),
(418, 'Mustébouée', '/img/mustebouee.png', '/img/mustebouee_shiny.png', '/img/mustebouee_mini.png', 4, 95, 60, 63, 40, 40, 40, 60, ''),
(419, 'Mustéflott', '/img/musteflott.png', '/img/musteflott_shiny.png', '/img/musteflott_mini.png', 4, 105, 80, 86, 60, 70, 50, 45, ''),
(420, 'Ceribou', '/img/ceribou.png', '/img/ceribou_shiny.png', '/img/ceribou_mini.png', 4, 55, 70, 40, 60, 40, 40, 120, ''),
(421, 'Ceriflor', '/img/ceriflor.png', '/img/ceriflor_shiny.png', '/img/ceriflor_mini.png', 4, 75, 90, 50, 110, 80, 60, 45, ''),
(422, 'Sancoki', '/img/sancoki.png', '/img/sancoki_shiny.png', '/img/sancoki_mini.png', 4, 50, 65, 64, 44, 48, 43, 45, ''),
(423, 'Tritosor', '/img/tritosor.png', '/img/tritosor_shiny.png', '/img/tritosor_mini.png', 4, 70, 95, 85, 54, 78, 68, 45, ''),
(424, 'Capidextre', '/img/capidextre.png', '/img/capidextre_shiny.png', '/img/capidextre_mini.png', 4, 75, 105, 75, 40, 75, 40, 45, ''),
(425, 'Baudrive', '/img/baudrive.png', '/img/baudrive_shiny.png', '/img/baudrive_mini.png', 4, 55, 55, 50, 45, 55, 40, 190, ''),
(426, 'Grodrive', '/img/grodrive.png', '/img/grodrive_shiny.png', '/img/grodrive_mini.png', 4, 75, 75, 70, 65, 75, 90, 75, ''),
(427, 'Laporeille', '/img/laporeille.png', '/img/laporeille_shiny.png', '/img/laporeille_mini.png', 4, 65, 76, 84, 54, 56, 85, 200, ''),
(428, 'Lockpin', '/img/lockpin.png', '/img/lockpin_shiny.png', '/img/lockpin_mini.png', 4, 55, 66, 44, 44, 56, 85, 120, ''),
(429, 'Magirêve', '/img/magireve.png', '/img/magireve_shiny.png', '/img/magireve_mini.png', 4, 85, 80, 70, 90, 75, 90, 45, ''),
(430, 'Corboss', '/img/corboss.png', '/img/corboss_shiny.png', '/img/corboss_mini.png', 4, 60, 115, 70, 65, 70, 90, 45, ''),
(431, 'Chaglam', '/img/chaglam.png', '/img/chaglam_shiny.png', '/img/chaglam_mini.png', 4, 48, 61, 40, 61, 40, 50, 190, ''),
(432, 'Chaffreux', '/img/chaffreux.png', '/img/chaffreux_shiny.png', '/img/chaffreux_mini.png', 4, 68, 81, 50, 81, 50, 70, 120, ''),
(433, 'Korillon', '/img/korillon.png', '/img/korillon_shiny.png', '/img/korillon_mini.png', 4, 45, 60, 45, 25, 45, 55, 200, ''),
(434, 'Moufouette', '/img/moufouette.png', '/img/moufouette_shiny.png', '/img/moufouette_mini.png', 4, 63, 63, 47, 41, 41, 74, 225, ''),
(435, 'Moufflair', '/img/moufflair.png', '/img/moufflair_shiny.png', '/img/moufflair_mini.png', 4, 103, 93, 67, 71, 61, 84, 60, ''),
(436, 'Archéomire', '/img/archeomire.png', '/img/archeomire_shiny.png', '/img/archeomire_mini.png', 4, 57, 24, 86, 24, 86, 23, 90, ''),
(437, 'Archéodong', '/img/archeodong.png', '/img/archeodong_shiny.png', '/img/archeodong_mini.png', 4, 67, 89, 116, 79, 116, 33, 60, ''),
(438, 'Manzaï', '/img/manzai.png', '/img/manzai_shiny.png', '/img/manzai_mini.png', 4, 50, 80, 95, 10, 45, 10, 120, ''),
(439, 'Mime Jr.', '/img/mime-jr.png', '/img/mime-jr_shiny.png', '/img/mime-jr_mini.png', 4, 20, 25, 45, 70, 90, 60, 145, ''),
(440, 'Ptiravi', '/img/ptravi.png', '/img/ptravi_shiny.png', '/img/ptravi_mini.png', 4, 100, 5, 5, 15, 65, 30, 190, ''),
(441, 'Pijako', '/img/pijako.png', '/img/pijako_shiny.png', '/img/pijako_mini.png', 4, 76, 65, 45, 92, 42, 91, 75, ''),
(442, 'Spiritomb', '/img/spiritomb.png', '/img/spiritomb_shiny.png', '/img/spiritomb_mini.png', 4, 50, 92, 108, 92, 108, 35, 75, ''),
(443, 'Griknot', '/img/griknot.png', '/img/griknot_shiny.png', '/img/griknot_mini.png', 4, 58, 70, 45, 45, 42, 42, 60, 'Surpuissant'),
(444, 'Carmache', '/img/carmache.png', '/img/carmache_shiny.png', '/img/carmache_mini.png', 4, 68, 90, 65, 50, 55, 82, 45, 'Surpuissant'),
(445, 'Carchacrok', '/img/carchacrok.png', '/img/carchacrok_shiny.png', '/img/carchacrok_mini.png', 4, 108, 130, 95, 80, 85, 102, 45, 'Surpuissant'),
(446, 'Goinfrex', '/img/goinfrex.png', '/img/goinfrex_shiny.png', '/img/goinfrex_mini.png', 4, 135, 85, 40, 40, 85, 5, 25, ''),
(447, 'Riolu', '/img/riolu.png', '/img/riolu_shiny.png', '/img/riolu_mini.png', 4, 40, 70, 40, 35, 40, 60, 75, ''),
(448, 'Lucario', '/img/lucario.png', '/img/lucario_shiny.png', '/img/lucario_mini.png', 4, 70, 110, 70, 115, 70, 90, 45, ''),
(449, 'Hippopotas', '/img/hippopotas.png', '/img/hippopotas_shiny.png', '/img/hippopotas_mini.png', 4, 68, 72, 78, 38, 42, 32, 190, ''),
(450, 'Hippodocus', '/img/hippodocus.png', '/img/hippodocus_shiny.png', '/img/hippodocus_mini.png', 4, 108, 112, 118, 68, 72, 47, 75, ''),
(451, 'Rapion', '/img/rapion.png', '/img/rapion_shiny.png', '/img/rapion_mini.png', 4, 40, 50, 100, 50, 100, 65, 120, ''),
(452, 'Drascore', '/img/drascore.png', '/img/drascore_shiny.png', '/img/drascore_mini.png', 4, 70, 90, 110, 60, 75, 95, 45, ''),
(453, 'Cradopaud', '/img/cradopaud.png', '/img/cradopaud_shiny.png', '/img/cradopaud_mini.png', 4, 48, 61, 40, 61, 40, 50, 45, ''),
(454, 'Coatox', '/img/coatox.png', '/img/coatox_shiny.png', '/img/coatox_mini.png', 4, 83, 106, 65, 86, 65, 85, 45, ''),
(455, 'Vortente', '/img/vortente.png', '/img/vortente_shiny.png', '/img/vortente_mini.png', 4, 74, 100, 72, 90, 72, 46, 120, ''),
(456, 'Écayon', '/img/ecayon.png', '/img/ecayon_shiny.png', '/img/ecayon_mini.png', 4, 49, 49, 56, 49, 61, 66, 190, ''),
(457, 'Luminéon', '/img/lumineon.png', '/img/lumineon_shiny.png', '/img/lumineon_mini.png', 4, 69, 69, 76, 69, 86, 91, 45, ''),
(458, 'Babimanta', '/img/babimanta.png', '/img/babimanta_shiny.png', '/img/babimanta_mini.png', 4, 45, 20, 50, 60, 120, 50, 45, ''),
(459, 'Blizzi', '/img/blizzi.png', '/img/blizzi_shiny.png', '/img/blizzi_mini.png', 4, 60, 62, 50, 62, 60, 40, 120, ''),
(460, 'Blizzaroi', '/img/blizzaroi.png', '/img/blizzaroi_shiny.png', '/img/blizzaroi_mini.png', 4, 90, 92, 75, 92, 85, 60, 60, ''),
(461, 'Dimoret', '/img/dimoret.png', '/img/dimoret_shiny.png', '/img/dimoret_mini.png', 4, 70, 120, 65, 45, 85, 125, 45, ''),
(462, 'Magnézone', '/img/magnezone.png', '/img/magnezone_shiny.png', '/img/magnezone_mini.png', 4, 70, 70, 115, 130, 90, 60, 45, ''),
(463, 'Coudlangue', '/img/coudlangue.png', '/img/coudlangue_shiny.png', '/img/coudlangue_mini.png', 4, 80, 80, 50, 105, 95, 80, 45, ''),
(464, 'Rhinastoc', '/img/rhinastoc.png', '/img/rhinastoc_shiny.png', '/img/rhinastoc_mini.png', 4, 115, 140, 130, 55, 55, 40, 45, ''),
(465, 'Bouldeneu', '/img/bouldeneu.png', '/img/bouldeneu_shiny.png', '/img/bouldeneu_mini.png', 4, 100, 105, 88, 75, 90, 50, 45, ''),
(466, 'Elekable', '/img/elekable.png', '/img/elekable_shiny.png', '/img/elekable_mini.png', 4, 75, 123, 67, 95, 85, 95, 45, ''),
(467, 'Maganon', '/img/maganon.png', '/img/maganon_shiny.png', '/img/maganon_mini.png', 4, 75, 95, 67, 125, 95, 83, 45, ''),
(468, 'Togekiss', '/img/togekiss.png', '/img/togekiss_shiny.png', '/img/togekiss_mini.png', 4, 85, 50, 95, 120, 115, 80, 45, ''),
(469, 'Yanmega', '/img/yanmega.png', '/img/yanmega_shiny.png', '/img/yanmega_mini.png', 4, 86, 76, 86, 116, 56, 95, 45, ''),
(470, 'Phyllali', '/img/phyllali.png', '/img/phyllali_shiny.png', '/img/phyllali_mini.png', 4, 65, 110, 130, 60, 65, 95, 45, ''),
(471, 'Givrali', '/img/givrali.png', '/img/givrali_shiny.png', '/img/givrali_mini.png', 4, 65, 60, 110, 130, 95, 65, 45, ''),
(472, 'Scorvol', '/img/scorvol.png', '/img/scorvol_shiny.png', '/img/scorvol_mini.png', 4, 75, 95, 125, 45, 75, 95, 45, ''),
(473, 'Mammochon', '/img/mammochon.png', '/img/mammochon_shiny.png', '/img/mammochon_mini.png', 4, 110, 130, 80, 70, 60, 80, 45, ''),
(474, 'Porygon-Z', '/img/porygon-z.png', '/img/porygon-z_shiny.png', '/img/porygon-z_mini.png', 4, 85, 80, 70, 135, 75, 90, 45, ''),
(475, 'Gallame', '/img/gallame.png', '/img/gallame_shiny.png', '/img/gallame_mini.png', 4, 68, 125, 65, 65, 115, 80, 45, ''),
(476, 'Tarinorme', '/img/tarinorme.png', '/img/tarinorme_shiny.png', '/img/tarinorme_mini.png', 4, 60, 55, 145, 75, 150, 40, 45, ''),
(477, 'Noctunoir', '/img/noctunoir.png', '/img/noctunoir_shiny.png', '/img/noctunoir_mini.png', 4, 45, 100, 135, 65, 135, 45, 45, ''),
(478, 'Momartik', '/img/momartik.png', '/img/momartik_shiny.png', '/img/momartik_mini.png', 4, 70, 80, 70, 80, 70, 110, 45, ''),
(479, 'Motisma', '/img/motisma.png', '/img/motisma_shiny.png', '/img/motisma_mini.png', 4, 50, 50, 77, 95, 77, 91, 45, ''),
(480, 'Créhelf', '/img/crehelf.png', '/img/crehelf_shiny.png', '/img/crehelf_mini.png', 4, 75, 75, 75, 125, 95, 115, 3, ''),
(481, 'Créfollet', '/img/crefollet.png', '/img/crefollet_shiny.png', '/img/crefollet_mini.png', 4, 75, 125, 70, 55, 95, 110, 3, ''),
(482, 'Créfadet', '/img/crefadet.png', '/img/crefadet_shiny.png', '/img/crefadet_mini.png', 4, 75, 70, 70, 125, 115, 95, 3, ''),
(483, 'Dialga', '/img/dialga.png', '/img/dialga_shiny.png', '/img/dialga_mini.png', 4, 100, 120, 120, 150, 100, 90, 3, ''),
(484, 'Palkia', '/img/palkia.png', '/img/palkia_shiny.png', '/img/palkia_mini.png', 4, 90, 120, 100, 150, 120, 100, 3, ''),
(485, 'Heatran', '/img/heatran.png', '/img/heatran_shiny.png', '/img/heatran_mini.png', 4, 91, 90, 106, 130, 106, 77, 3, ''),
(486, 'Regigigas', '/img/regigigas.png', '/img/regigigas_shiny.png', '/img/regigigas_mini.png', 4, 110, 160, 110, 80, 110, 100, 3, ''),
(487, 'Giratina', '/img/giratina.png', '/img/giratina_shiny.png', '/img/giratina_mini.png', 4, 150, 100, 120, 100, 120, 90, 3, ''),
(488, 'Cresselia', '/img/cresselia.png', '/img/cresselia_shiny.png', '/img/cresselia_mini.png', 4, 120, 70, 120, 75, 130, 85, 3, ''),
(489, 'Phione', '/img/phione.png', '/img/phione_shiny.png', '/img/phione_mini.png', 4, 80, 80, 80, 80, 80, 80, 3, ''),
(490, 'Manaphy', '/img/manaphy.png', '/img/manaphy_shiny.png', '/img/manaphy_mini.png', 4, 100, 100, 100, 100, 100, 100, 3, ''),
(491, 'Darkrai', '/img/darkrai.png', '/img/darkrai_shiny.png', '/img/darkrai_mini.png', 4, 70, 90, 90, 135, 90, 125, 3, ''),
(492, 'Shaymin', '/img/shaymin.png', '/img/shaymin_shiny.png', '/img/shaymin_mini.png', 4, 100, 100, 100, 100, 100, 100, 3, ''),
(493, 'Arceus', '/img/arceus.png', '/img/arceus_shiny.png', '/img/arceus_mini.png', 4, 120, 120, 120, 120, 120, 120, 3, '');

-- --------------------------------------------------------

--
-- Structure de la table `posseder`
--

CREATE TABLE `posseder` (
  `num_pokedex` int(11) NOT NULL,
  `id_type` int(11) NOT NULL,
  `type_ordre` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `posseder`
--

INSERT INTO `posseder` (`num_pokedex`, `id_type`, `type_ordre`) VALUES
(1, 2, 1),
(1, 11, 2),
(2, 2, 1),
(2, 11, 2),
(3, 2, 1),
(3, 11, 2),
(4, 3, 1),
(5, 3, 1),
(6, 3, 1),
(6, 6, 2),
(7, 4, 1),
(8, 4, 1),
(9, 4, 1),
(10, 7, 1),
(11, 7, 1),
(12, 6, 2),
(12, 7, 1),
(13, 7, 1),
(13, 11, 2),
(14, 7, 1),
(14, 11, 2),
(15, 7, 1),
(15, 11, 2),
(16, 1, 1),
(16, 6, 2),
(17, 1, 1),
(17, 6, 2),
(18, 1, 1),
(18, 6, 2),
(19, 1, 1),
(20, 1, 1),
(21, 1, 1),
(21, 6, 2),
(22, 1, 1),
(22, 6, 2),
(23, 11, 1),
(24, 11, 1),
(25, 5, 1),
(26, 5, 1),
(27, 9, 1),
(28, 9, 1),
(29, 11, 1),
(30, 11, 1),
(31, 9, 2),
(31, 11, 1),
(32, 11, 1),
(33, 11, 1),
(34, 9, 2),
(34, 11, 1),
(35, 18, 1),
(36, 18, 1),
(37, 3, 1),
(38, 3, 1),
(39, 1, 1),
(39, 18, 2),
(40, 1, 1),
(40, 18, 2),
(41, 6, 2),
(41, 11, 1),
(42, 6, 2),
(42, 11, 1),
(43, 2, 1),
(43, 11, 2),
(44, 2, 1),
(44, 11, 2),
(45, 2, 1),
(45, 11, 2),
(46, 2, 2),
(46, 7, 1),
(47, 2, 2),
(47, 7, 1),
(48, 7, 1),
(48, 11, 2),
(49, 7, 1),
(49, 11, 2),
(50, 9, 1),
(51, 9, 1),
(52, 1, 1),
(53, 1, 1),
(54, 4, 1),
(55, 4, 1),
(56, 15, 1),
(57, 15, 1),
(58, 3, 1),
(59, 3, 1),
(60, 4, 1),
(61, 4, 1),
(62, 4, 1),
(62, 15, 2),
(63, 10, 1),
(64, 10, 1),
(65, 10, 1),
(66, 15, 1),
(67, 15, 1),
(68, 15, 1),
(69, 2, 1),
(69, 11, 2),
(70, 2, 1),
(70, 11, 2),
(71, 2, 1),
(71, 11, 2),
(72, 4, 1),
(72, 11, 2),
(73, 4, 1),
(73, 11, 2),
(74, 8, 1),
(74, 9, 2),
(75, 8, 1),
(75, 9, 2),
(76, 8, 1),
(76, 9, 2),
(77, 3, 1),
(78, 3, 1),
(79, 4, 1),
(79, 10, 2),
(80, 4, 1),
(80, 10, 2),
(81, 5, 1),
(81, 14, 2),
(82, 5, 1),
(82, 14, 2),
(83, 1, 1),
(83, 6, 2),
(84, 1, 1),
(84, 6, 2),
(85, 1, 1),
(85, 6, 2),
(86, 4, 1),
(87, 4, 1),
(87, 16, 2),
(88, 11, 1),
(89, 11, 1),
(90, 4, 1),
(91, 4, 1),
(91, 16, 2),
(92, 11, 2),
(92, 12, 1),
(93, 11, 2),
(93, 12, 1),
(94, 11, 2),
(94, 12, 1),
(95, 8, 1),
(95, 9, 2),
(96, 10, 1),
(97, 10, 1),
(98, 4, 1),
(99, 4, 1),
(100, 5, 1),
(101, 5, 1),
(102, 2, 1),
(102, 10, 2),
(103, 2, 1),
(103, 10, 2),
(104, 9, 1),
(105, 9, 1),
(106, 15, 1),
(107, 15, 1),
(108, 1, 1),
(109, 11, 1),
(110, 11, 1),
(111, 8, 2),
(111, 9, 1),
(112, 8, 2),
(112, 9, 1),
(113, 1, 1),
(114, 2, 1),
(115, 1, 1),
(116, 4, 1),
(117, 4, 1),
(118, 4, 1),
(119, 4, 1),
(120, 4, 1),
(121, 4, 1),
(121, 10, 2),
(122, 10, 1),
(122, 18, 2),
(123, 6, 2),
(123, 7, 1),
(124, 10, 2),
(124, 16, 1),
(125, 5, 1),
(126, 3, 1),
(127, 7, 1),
(128, 1, 1),
(129, 4, 1),
(130, 4, 1),
(130, 6, 2),
(131, 4, 1),
(131, 16, 2),
(132, 1, 1),
(133, 1, 1),
(134, 4, 1),
(135, 5, 1),
(136, 3, 1),
(137, 1, 1),
(138, 4, 2),
(138, 8, 1),
(139, 4, 2),
(139, 8, 1),
(140, 4, 2),
(140, 8, 1),
(141, 4, 2),
(141, 8, 1),
(142, 6, 2),
(142, 8, 1),
(143, 1, 1),
(144, 6, 2),
(144, 16, 1),
(145, 5, 1),
(145, 6, 2),
(146, 3, 1),
(146, 6, 2),
(147, 17, 1),
(148, 17, 1),
(149, 6, 2),
(149, 17, 1),
(150, 10, 1),
(151, 10, 1),
(152, 2, 1),
(153, 2, 1),
(154, 2, 1),
(155, 3, 1),
(156, 3, 1),
(157, 3, 1),
(158, 4, 1),
(159, 4, 1),
(160, 4, 1),
(161, 1, 1),
(162, 1, 1),
(163, 1, 1),
(163, 6, 2),
(164, 1, 1),
(164, 6, 2),
(165, 6, 2),
(165, 7, 1),
(166, 6, 2),
(166, 7, 1),
(167, 7, 1),
(167, 11, 2),
(168, 7, 1),
(168, 11, 2),
(169, 6, 2),
(169, 11, 1),
(170, 4, 1),
(170, 5, 2),
(171, 4, 1),
(171, 5, 2),
(172, 5, 1),
(173, 18, 1),
(174, 1, 1),
(174, 18, 2),
(175, 18, 1),
(176, 6, 2),
(176, 18, 1),
(177, 6, 2),
(177, 10, 1),
(178, 6, 2),
(178, 10, 1),
(179, 5, 1),
(180, 5, 1),
(181, 5, 1),
(182, 2, 1),
(183, 4, 1),
(183, 18, 2),
(184, 4, 1),
(184, 18, 2),
(185, 8, 1),
(186, 4, 1),
(187, 2, 1),
(187, 6, 2),
(188, 2, 1),
(188, 6, 2),
(189, 2, 1),
(189, 6, 2),
(190, 1, 1),
(191, 2, 1),
(192, 2, 1),
(193, 6, 2),
(193, 7, 1),
(194, 4, 1),
(194, 9, 2),
(195, 4, 1),
(195, 9, 2),
(196, 10, 1),
(197, 13, 1),
(198, 6, 2),
(198, 13, 1),
(199, 4, 1),
(199, 10, 2),
(200, 12, 1),
(201, 10, 1),
(202, 10, 1),
(203, 1, 1),
(203, 10, 2),
(204, 7, 1),
(205, 7, 1),
(205, 14, 2),
(206, 1, 1),
(207, 6, 2),
(207, 9, 1),
(208, 9, 2),
(208, 14, 1),
(209, 18, 1),
(210, 18, 1),
(211, 4, 1),
(211, 11, 2),
(212, 7, 1),
(212, 14, 2),
(213, 7, 1),
(213, 8, 2),
(214, 7, 1),
(214, 15, 2),
(215, 13, 1),
(215, 16, 2),
(216, 1, 1),
(217, 1, 1),
(218, 3, 1),
(219, 3, 1),
(219, 8, 2),
(220, 9, 2),
(220, 16, 1),
(221, 9, 2),
(221, 16, 1),
(222, 4, 1),
(222, 8, 2),
(223, 4, 1),
(224, 4, 1),
(225, 6, 2),
(225, 16, 1),
(226, 4, 1),
(226, 6, 2),
(227, 6, 2),
(227, 14, 1),
(228, 3, 2),
(228, 13, 1),
(229, 3, 2),
(229, 13, 1),
(230, 4, 1),
(230, 17, 2),
(231, 9, 1),
(232, 9, 1),
(233, 1, 1),
(234, 1, 1),
(235, 1, 1),
(236, 15, 1),
(237, 15, 1),
(238, 10, 2),
(238, 16, 1),
(239, 5, 1),
(240, 3, 1),
(241, 1, 1),
(242, 1, 1),
(243, 5, 1),
(244, 3, 1),
(245, 4, 1),
(246, 8, 1),
(246, 9, 2),
(247, 8, 1),
(247, 9, 2),
(248, 8, 1),
(248, 13, 2),
(249, 6, 2),
(249, 10, 1),
(250, 3, 1),
(250, 6, 2),
(251, 2, 2),
(251, 10, 1),
(252, 2, 1),
(253, 2, 1),
(254, 2, 1),
(255, 3, 1),
(256, 3, 1),
(256, 15, 2),
(257, 3, 1),
(257, 15, 2),
(258, 4, 1),
(259, 4, 1),
(259, 9, 2),
(260, 4, 1),
(260, 9, 2),
(261, 13, 1),
(262, 13, 1),
(263, 1, 1),
(264, 1, 1),
(265, 7, 1),
(266, 7, 1),
(267, 6, 2),
(267, 7, 1),
(268, 7, 1),
(269, 7, 1),
(269, 11, 2),
(270, 2, 2),
(270, 4, 1),
(271, 2, 2),
(271, 4, 1),
(272, 2, 2),
(272, 4, 1),
(273, 2, 1),
(274, 2, 1),
(274, 13, 2),
(275, 2, 1),
(275, 13, 2),
(276, 1, 1),
(276, 6, 2),
(277, 1, 1),
(277, 6, 2),
(278, 4, 1),
(278, 6, 2),
(279, 4, 1),
(279, 6, 2),
(280, 10, 1),
(280, 18, 2),
(281, 10, 1),
(281, 18, 2),
(282, 10, 1),
(282, 18, 2),
(283, 4, 2),
(283, 7, 1),
(284, 6, 2),
(284, 7, 1),
(285, 2, 1),
(286, 2, 1),
(286, 15, 2),
(287, 1, 1),
(288, 1, 1),
(289, 1, 1),
(290, 7, 1),
(290, 9, 2),
(291, 6, 2),
(291, 7, 1),
(292, 7, 1),
(292, 12, 2),
(293, 1, 1),
(294, 1, 1),
(295, 1, 1),
(296, 15, 1),
(297, 15, 1),
(298, 1, 1),
(298, 18, 2),
(299, 8, 1),
(300, 1, 1),
(301, 1, 1),
(302, 12, 2),
(302, 13, 1),
(303, 14, 1),
(303, 18, 2),
(304, 8, 2),
(304, 14, 1),
(305, 8, 2),
(305, 14, 1),
(306, 8, 2),
(306, 14, 1),
(307, 10, 2),
(307, 15, 1),
(308, 10, 2),
(308, 15, 1),
(309, 5, 1),
(310, 5, 1),
(311, 5, 1),
(312, 5, 1),
(313, 7, 1),
(314, 7, 1),
(315, 2, 1),
(315, 11, 2),
(316, 11, 1),
(317, 11, 1),
(318, 4, 1),
(318, 13, 2),
(319, 4, 1),
(319, 13, 2),
(320, 4, 1),
(321, 4, 1),
(322, 3, 1),
(322, 9, 2),
(323, 3, 1),
(323, 9, 2),
(324, 3, 1),
(325, 10, 1),
(326, 10, 1),
(327, 1, 1),
(328, 9, 1),
(329, 9, 1),
(329, 17, 2),
(330, 9, 1),
(330, 17, 2),
(331, 2, 1),
(332, 2, 1),
(332, 13, 2),
(333, 1, 1),
(333, 6, 2),
(334, 6, 2),
(334, 17, 1),
(335, 1, 1),
(336, 11, 1),
(337, 8, 1),
(337, 10, 2),
(338, 8, 1),
(338, 10, 2),
(339, 4, 1),
(339, 9, 2),
(340, 4, 1),
(340, 9, 2),
(341, 4, 1),
(342, 4, 1),
(342, 13, 2),
(343, 9, 1),
(343, 10, 2),
(344, 9, 1),
(344, 10, 2),
(345, 2, 2),
(345, 8, 1),
(346, 2, 2),
(346, 8, 1),
(347, 7, 2),
(347, 8, 1),
(348, 7, 2),
(348, 8, 1),
(349, 4, 1),
(350, 4, 1),
(351, 1, 1),
(352, 1, 1),
(353, 12, 1),
(354, 12, 1),
(355, 12, 1),
(356, 12, 1),
(357, 2, 1),
(357, 6, 2),
(358, 10, 1),
(359, 13, 1),
(360, 10, 1),
(361, 16, 1),
(362, 16, 1),
(363, 4, 2),
(363, 16, 1),
(364, 4, 2),
(364, 16, 1),
(365, 4, 2),
(365, 16, 1),
(366, 4, 1),
(367, 4, 1),
(368, 4, 1),
(369, 4, 1),
(369, 8, 2),
(370, 4, 1),
(371, 17, 1),
(372, 17, 1),
(373, 6, 2),
(373, 17, 1),
(374, 10, 2),
(374, 14, 1),
(375, 10, 2),
(375, 14, 1),
(376, 10, 2),
(376, 14, 1),
(377, 8, 1),
(378, 16, 1),
(379, 14, 1),
(380, 10, 2),
(380, 17, 1),
(381, 10, 2),
(381, 17, 1),
(382, 4, 1),
(383, 9, 1),
(384, 6, 2),
(384, 17, 1),
(385, 10, 2),
(385, 14, 1),
(386, 10, 1);

-- --------------------------------------------------------

--
-- Structure de la table `statut`
--

CREATE TABLE `statut` (
  `id_statut` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `talents`
--

CREATE TABLE `talents` (
  `id_talent` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `description_talent` varchar(50) NOT NULL,
  `generation` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `types`
--

CREATE TABLE `types` (
  `id_type` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `types`
--

INSERT INTO `types` (`id_type`, `nom`) VALUES
(14, 'Acier'),
(15, 'Combat'),
(17, 'Dragon'),
(4, 'Eau'),
(5, 'Électrik'),
(18, 'Fée'),
(3, 'Feu'),
(16, 'Glace'),
(7, 'Insecte'),
(1, 'Normal'),
(2, 'Plante'),
(11, 'Poison'),
(10, 'Psy'),
(8, 'Roche'),
(9, 'Sol'),
(12, 'Spectre'),
(13, 'Ténèbres'),
(6, 'Vol');

-- --------------------------------------------------------

--
-- Structure de la table `utiliser`
--

CREATE TABLE `utiliser` (
  `num_pokedex` int(11) NOT NULL,
  `id_objet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `acceder`
--
ALTER TABLE `acceder`
  ADD PRIMARY KEY (`num_pokedex`,`id_meca`),
  ADD KEY `id_meca` (`id_meca`);

--
-- Index pour la table `applique`
--
ALTER TABLE `applique`
  ADD PRIMARY KEY (`id_talent`,`id_statut`),
  ADD KEY `id_statut` (`id_statut`);

--
-- Index pour la table `attaques`
--
ALTER TABLE `attaques`
  ADD PRIMARY KEY (`id_attaque`),
  ADD KEY `id_type` (`id_type`);

--
-- Index pour la table `avoir`
--
ALTER TABLE `avoir`
  ADD PRIMARY KEY (`num_pokedex`,`id_attaque`),
  ADD KEY `id_attaque` (`id_attaque`);

--
-- Index pour la table `donne`
--
ALTER TABLE `donne`
  ADD PRIMARY KEY (`id_objet`,`id_statut`),
  ADD KEY `id_statut` (`id_statut`);

--
-- Index pour la table `détenir`
--
ALTER TABLE `détenir`
  ADD PRIMARY KEY (`num_pokedex`,`id_talent`),
  ADD KEY `id_talent` (`id_talent`);

--
-- Index pour la table `inflige`
--
ALTER TABLE `inflige`
  ADD PRIMARY KEY (`id_attaque`,`id_statut`),
  ADD KEY `id_statut` (`id_statut`);

--
-- Index pour la table `mecanique`
--
ALTER TABLE `mecanique`
  ADD PRIMARY KEY (`id_meca`),
  ADD UNIQUE KEY `id_objet` (`id_objet`),
  ADD UNIQUE KEY `nom_meca` (`nom_meca`);

--
-- Index pour la table `objet`
--
ALTER TABLE `objet`
  ADD PRIMARY KEY (`id_objet`),
  ADD UNIQUE KEY `nom` (`nom`),
  ADD UNIQUE KEY `description` (`description`),
  ADD UNIQUE KEY `img` (`img`);

--
-- Index pour la table `pokemon`
--
ALTER TABLE `pokemon`
  ADD PRIMARY KEY (`num_pokedex`),
  ADD UNIQUE KEY `nom` (`nom`),
  ADD UNIQUE KEY `img` (`img`),
  ADD UNIQUE KEY `img_shiny` (`img_shiny`),
  ADD UNIQUE KEY `img_mini` (`img_mini`);

--
-- Index pour la table `posseder`
--
ALTER TABLE `posseder`
  ADD PRIMARY KEY (`num_pokedex`,`id_type`),
  ADD KEY `id_type` (`id_type`);

--
-- Index pour la table `statut`
--
ALTER TABLE `statut`
  ADD PRIMARY KEY (`id_statut`),
  ADD UNIQUE KEY `nom` (`nom`);

--
-- Index pour la table `talents`
--
ALTER TABLE `talents`
  ADD PRIMARY KEY (`id_talent`),
  ADD UNIQUE KEY `description_talent` (`description_talent`);

--
-- Index pour la table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id_type`),
  ADD UNIQUE KEY `nom` (`nom`);

--
-- Index pour la table `utiliser`
--
ALTER TABLE `utiliser`
  ADD PRIMARY KEY (`num_pokedex`,`id_objet`),
  ADD KEY `id_objet` (`id_objet`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `acceder`
--
ALTER TABLE `acceder`
  ADD CONSTRAINT `acceder_ibfk_1` FOREIGN KEY (`num_pokedex`) REFERENCES `pokemon` (`num_pokedex`),
  ADD CONSTRAINT `acceder_ibfk_2` FOREIGN KEY (`id_meca`) REFERENCES `mecanique` (`id_meca`);

--
-- Contraintes pour la table `applique`
--
ALTER TABLE `applique`
  ADD CONSTRAINT `applique_ibfk_1` FOREIGN KEY (`id_talent`) REFERENCES `talents` (`id_talent`),
  ADD CONSTRAINT `applique_ibfk_2` FOREIGN KEY (`id_statut`) REFERENCES `statut` (`id_statut`);

--
-- Contraintes pour la table `attaques`
--
ALTER TABLE `attaques`
  ADD CONSTRAINT `attaques_ibfk_1` FOREIGN KEY (`id_type`) REFERENCES `types` (`id_type`);

--
-- Contraintes pour la table `avoir`
--
ALTER TABLE `avoir`
  ADD CONSTRAINT `avoir_ibfk_1` FOREIGN KEY (`num_pokedex`) REFERENCES `pokemon` (`num_pokedex`),
  ADD CONSTRAINT `avoir_ibfk_2` FOREIGN KEY (`id_attaque`) REFERENCES `attaques` (`id_attaque`);

--
-- Contraintes pour la table `donne`
--
ALTER TABLE `donne`
  ADD CONSTRAINT `donne_ibfk_1` FOREIGN KEY (`id_objet`) REFERENCES `objet` (`id_objet`),
  ADD CONSTRAINT `donne_ibfk_2` FOREIGN KEY (`id_statut`) REFERENCES `statut` (`id_statut`);

--
-- Contraintes pour la table `détenir`
--
ALTER TABLE `détenir`
  ADD CONSTRAINT `détenir_ibfk_1` FOREIGN KEY (`num_pokedex`) REFERENCES `pokemon` (`num_pokedex`),
  ADD CONSTRAINT `détenir_ibfk_2` FOREIGN KEY (`id_talent`) REFERENCES `talents` (`id_talent`);

--
-- Contraintes pour la table `inflige`
--
ALTER TABLE `inflige`
  ADD CONSTRAINT `inflige_ibfk_1` FOREIGN KEY (`id_attaque`) REFERENCES `attaques` (`id_attaque`),
  ADD CONSTRAINT `inflige_ibfk_2` FOREIGN KEY (`id_statut`) REFERENCES `statut` (`id_statut`);

--
-- Contraintes pour la table `mecanique`
--
ALTER TABLE `mecanique`
  ADD CONSTRAINT `mecanique_ibfk_1` FOREIGN KEY (`id_objet`) REFERENCES `objet` (`id_objet`);

--
-- Contraintes pour la table `posseder`
--
ALTER TABLE `posseder`
  ADD CONSTRAINT `posseder_ibfk_1` FOREIGN KEY (`num_pokedex`) REFERENCES `pokemon` (`num_pokedex`),
  ADD CONSTRAINT `posseder_ibfk_2` FOREIGN KEY (`id_type`) REFERENCES `types` (`id_type`);

--
-- Contraintes pour la table `utiliser`
--
ALTER TABLE `utiliser`
  ADD CONSTRAINT `utiliser_ibfk_1` FOREIGN KEY (`num_pokedex`) REFERENCES `pokemon` (`num_pokedex`),
  ADD CONSTRAINT `utiliser_ibfk_2` FOREIGN KEY (`id_objet`) REFERENCES `objet` (`id_objet`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
